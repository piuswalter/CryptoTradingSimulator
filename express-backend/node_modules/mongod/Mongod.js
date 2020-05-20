'use strict';

/**
 * Configuration options for {@link Mongod}.
 * @typedef {Object} Mongod~Config
 * @property {String} [bin=mongod]
 * @property {String} [config]
 * @property {(Number|String)} [port=27017]
 * @property {String} [dbpath]
 * @property {String} [storageEngine]
 * @property {Boolean} [nojournal=false]
 */

/**
 * Invoked when an operation (i.e. {@link Mongod#open}) completes.
 * @callback Mongod~callback
 * @argument {Error} err
 */

const childprocess = require('child_process');
const events = require('events');
const PromiseQueue = require('promise-queue');

/**
 * A collection of regualar expressions used by {@link Mongod.parseData} to
 * parse stdout and stderr messages.
 * @see Mongod.parseData
 * @readonly
 * @private
 * @type {Object.<String,RegExp>}
 */
const regExp = {
  terminalMessage: /waiting\s+for\s+connections|already\s+in\s+use|denied|error|exception|badvalue/im,
  whiteSpace: /\s/g,
  newline: /\r?\n/
};

/**
 * Start and stop a local MongoDB server like a boss.
 * @class
 */
class Mongod extends events.EventEmitter {

  /**
   * Get a function that takes chunks of stdin data, aggregates it, and passes
   * it in complete lines, one by one, to a given {@link Mongod~callback}.
   * @argument {Mongod~callback} callback
   * @return {Function}
   */
  static getTextLineAggregator(callback) {
    let buffer = '';

    return (data) => {
      const fragments = data.toString().split(regExp.newline);
      const lines = fragments.slice(0, fragments.length - 1);

      // If there was an unended line in the previous dump, complete it by
      // the first section.
      lines[0] = buffer + lines[0];

      // If there is an unended line in this dump, store it to be completed by
      // the next. This assumes there will be a terminating newline character
      // at some point. Generally, this is a safe assumption.
      buffer = fragments[fragments.length - 1];

      for (let line of lines) {
        callback(line);
      }
    };
  }

  /**
   * Populate a given {@link Mongod~Config} with values from a
   * given {@link Mongod~Config}.
   * @protected
   * @argument {Mongod~Config} source
   * @argument {Mongod~Config} target
   * @return {Mongod~Config}
   */
  static parseConfig(source, target) {
    if (target == null) {
      target = Object.create(null);
    }

    if (source == null) {
      return target;
    }

    if (typeof source === 'number' || typeof source === 'string') {
      target.port = source;

      return target;
    }

    if (typeof source !== 'object') {
      return target;
    }

    if (source.bin != null) {
      target.bin = source.bin;
    }

    if (source.conf != null) {
      target.conf = source.conf;

      return target;
    }

    if (source.nojournal === true) {
      target.nojournal = true;
    }

    if (source.storageEngine != null) {
      target.storageEngine = source.storageEngine;
    }

    if (source.dbpath != null) {
      target.dbpath = source.dbpath;
    }

    if (source.port != null) {
      target.port = source.port;
    }

    return target;
  }

  /**
   * Parse process flags for MongoDB from a given {@link Mongod~Config}.
   * @protected
   * @argument {Mongod~Config} config
   * @return {Array.<String>}
   */
  static parseFlags(config) {
    if (config.conf != null) {
      return ['--config', config.conf];
    }

    const flags = [];

    if (config.nojournal) {
      flags.push('--nojournal');
    }

    if (config.storageEngine != null) {
      flags.push('--storageEngine', config.storageEngine);
    }

    if (config.dbpath != null) {
      flags.push('--dbpath', config.dbpath);
    }

    if (config.port != null) {
      flags.push('--port', config.port);
    }

    return flags;
  }

  /**
   * Parse MongoDB server output for terminal messages.
   * @protected
   * @argument {String} string
   * @return {Object}
   */
  static parseData(string) {
    const matches = regExp.terminalMessage.exec(string);

    if (matches === null) {
      return null;
    }

    const result = {
      err: null,
      key: matches
      .pop()
      .replace(regExp.whiteSpace, '')
      .toLowerCase()
    };

    switch (result.key) {
      case 'waitingforconnections':
        break;

      case 'alreadyinuse':
        result.err = new Error('Address already in use');
        result.err.code = -1;

        break;

      case 'denied':
        result.err = new Error('Permission denied');
        result.err.code = -2;

        break;

      case 'error':
      case 'exception':
      case 'badvalue':
        result.err = new Error(string.trim());
        result.err.code = -3;

        break;
    }

    return result;
  }

  /**
   * Start a given {@link Mongod}.
   * @protected
   * @argument {Mongod} server
   * @return {Promise}
   */
  static open(server) {
    if (server.isOpening) {
      return server.openPromise;
    }

    server.isOpening = true;
    server.isClosing = false;
    server.openPromise = server.promiseQueue.add(() => {
      if (server.isClosing || server.isRunning) {
        server.isOpening = false;

        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {
        /**
         * A listener for the current server process' stdout/stderr that
         * resolves or rejects the current {@link Promise} when done.
         * @see Mongod.getTextLineAggregator
         * @see Mongod.parseData
         * @argument {Buffer} buffer
         * @return {undefined}
         */
        const dataListener = Mongod.getTextLineAggregator((value) => {
          const result = Mongod.parseData(value);

          if (result === null) {
            return;
          }

          server.process.stdout.removeListener('data', dataListener);

          server.isOpening = false;

          if (result.err === null) {
            server.isRunning = true;

            server.emit('open');
            resolve(null);
          }
          else {
            server.isClosing = true;

            server.emit('closing');
            server.process.once('close', () => reject(result.err));
          }
        });

        /**
         * A listener to close the server when the current process exits.
         * @return {undefined}
         */
        const exitListener = () => {
          // istanbul ignore next
          server.close();
        };

        /**
         * Get a text line aggregator that emits a given {@linkcode event}
         * for the current server.
         * @see Mongod.getTextLineAggregator
         * @argument {String} event
         * @return {Function}
         */
        const getDataPropagator = (event) =>
          Mongod.getTextLineAggregator((line) => server.emit(event, line));

        server.emit('opening');

        server.process = childprocess.spawn(
          server.config.bin,
          Mongod.parseFlags(server.config)
        );

        server.process.stderr.on('data', dataListener);
        server.process.stderr.on('data', getDataPropagator('stdout'));
        server.process.stdout.on('data', dataListener);
        server.process.stdout.on('data', getDataPropagator('stdout'));
        server.process.on('close', () => {
          server.process = null;
          server.isRunning = false;
          server.isClosing = false;

          process.removeListener('exit', exitListener);
          server.emit('close');
        });
        process.on('exit', exitListener);
      });
    });

    return server.openPromise;
  }

  /**
   * Stop a given {@link Mongod}.
   * @protected
   * @argument {Mongod} server
   * @return {Promise}
   */
  static close(server) {
    if (server.isClosing) {
      return server.closePromise;
    }

    server.isClosing = true;
    server.isOpening = false;
    server.closePromise = server.promiseQueue.add(() => {
      if (server.isOpening || !server.isRunning) {
        server.isClosing = false;

        return Promise.resolve(null);
      }

      return new Promise((resolve) => {
        server.emit('closing');
        server.process.once('close', () => resolve(null));
        server.process.kill();
      });
    });

    return server.closePromise;
  }

  /**
   * Construct a new {@link Mongod}.
   * @argument {(Number|String|Mongod~Config)} [configOrPort]
   * A number or string that is a port or an object for configuration.
   */
  constructor(configOrPort) {
    super();

    /**
     * Configuration options.
     * @protected
     * @type {Mongod~Config}
     */
    this.config = Mongod.parseConfig(configOrPort, {
      bin: 'mongod',
      conf: null,
      port: 27017,
      dbpath: null,
      storageEngine: null,
      nojournal: false
    });

    /**
     * The current process.
     * @protected
     * @type {ChildProcess}
     */
    this.process = null;

    /**
     * The last {@link Promise} returned by {@link Mongod#open}.
     * @protected
     * @type {Promise}
     */
    this.openPromise = Promise.resolve(null);

    /**
     * The last {@link Promise} returned by {@link Mongod#close}.
     * @protected
     * @type {Promise}
     */
    this.closePromise = Promise.resolve(null);

    /**
     * A serial queue of open and close promises.
     * @protected
     * @type {PromiseQueue}
     */
    this.promiseQueue = new PromiseQueue(1);

    /**
     * Determine if the instance is closing a MongoDB server; {@linkcode true}
     * while a process is being, or about to be, killed until the
     * contained MongoDB server either closes or errs.
     * @readonly
     * @type {Boolean}
     */
    this.isClosing = false;

    /**
     * Determine if the instance is starting a MongoDB server; {@linkcode true}
     * while a process is spawning, or about tobe spawned, until the
     * contained MongoDB server either starts or errs.
     * @readonly
     * @type {Boolean}
     */
    this.isRunning = false;

    /**
     * Determine if the instance is running a MongoDB server; {@linkcode true}
     * once a process has spawned and the contained MongoDB server is ready
     * to service requests.
     * @readonly
     * @type {Boolean}
     */
    this.isOpening = false;
  }

  /**
   * Open the server.
   * @argument {Mongod~callback} [callback]
   * @return {Promise}
   */
  open(callback) {
    const promise = Mongod.open(this);

    return typeof callback === 'function'
    ? promise
      .then((v) => callback(null, v))
      .catch((e) => callback(e, null))
    : promise;
  }

  /**
   * Close the server.
   * @argument {Mongod~callback} [callback]
   * @return {Promise}
   */
  close(callback) {
    const promise = Mongod.close(this);

    return typeof callback === 'function'
    ? promise
      .then((v) => callback(null, v))
      .catch((e) => callback(e, null))
    : promise;
  }
}

module.exports = exports = Mongod;
