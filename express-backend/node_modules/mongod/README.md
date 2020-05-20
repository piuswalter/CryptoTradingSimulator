# mongod

[![NPM version](https://img.shields.io/npm/v/mongod.svg)](https://www.npmjs.com/package/mongod)
[![Build Status](https://img.shields.io/travis/BrandonZacharie/node-mongod/master.svg)](https://travis-ci.org/BrandonZacharie/node-mongod)
[![Coverage Status](https://img.shields.io/coveralls/BrandonZacharie/node-mongod/master.svg)](https://coveralls.io/github/BrandonZacharie/node-mongod?branch=master)
[![License](https://img.shields.io/npm/l/redis-server.svg)](https://github.com/BrandonZacharie/node-mongod/blob/master/LICENSE.md)

Start and stop a local MongoDB server in Node.js like a boss.

## Installation

```Bash

npm install mongod

```

## Usage

The constructor exported by this module optionally accepts a single argument;
a number or string that is a port or an object for configuration.

### Basic Example

```JavaScript

const Mongod = require('mongod');

// Simply pass the port that you want a MongoDB server to listen on.
const server = new Mongod(27017);

server.open((err) => {
  if (err === null) {
    // You may now connect a client to the MongoDB
    // server bound to port 27017.
  }
});

```

### Configuration

| Property      | Type    | Default | Description
|:--------------|:--------|:--------|:-----------
| bin           | String  | mongod  | A path to a MongoDB server binary.
| conf          | String  |         | A path to a MongoDB server configuration file.
| dbpath        | String  |         | A path to a to store MongoDB server files.
| storageEngine | String  |         | A MongoDB storage engine (i.e. wiredTiger).
| nojournal     | Boolean | false   | A flag to tell MongoDB to disable journaling.
| port          | Number  | 27017   | A port to bind a MongoDB server to.

A MongoDB server binary must be available. If you do not have one in $PATH,
provide a path in configuration.

```JavaScript

const server = new Mongod({
  port: 27017,
  bin: '/opt/local/bin/mongod'
});

```

You may use a MongoDB configuration file instead of configuration object
properties that are flags (i.e. `dbpath` and `port`). If `conf` is
provided, no flags will be passed to the binary.

```JavaScript

const server = new Mongod({
  conf: '/path/to/mongodb.conf'
});

```

### Methods

For methods that accept `callback`, `callback` will receive an `Error`
as the first argument if a problem is detected; `null`, if not.

#### Mongod#open()

Attempt to open a MongoDB server. Returns a `Promise`.

##### Promise style `open()`

``` JavaScript

server.open().then(() => {
  // You may now connect to the MongoDB server.
});

```

##### Callback style `open()`

``` JavaScript

server.open((err) => {
  if (err === null) {
    // You may now connect to the MongoDB server.
  }
});

```

#### Mongod#close()

Close the associated MongoDB server. Returns a `Promise`. NOTE: Disconnect
clients prior to calling this method to avoid receiving connection
errors from clients.

##### Promise style `close()`

``` JavaScript

server.close().then(() => {
  // The MongoDB server is now closed.
});

```

##### Callback style `close()`

``` JavaScript

server.close((err) => {
  // The MongoDB server is now closed.
});

```

### Properties

#### Mongod#isOpening

Determine if the instance is starting a MongoDB server; `true` while a
process is spawning, and/or about to be spawned, until the contained MongoDB
server either starts or errs.

#### Mongod#isRunning

Determine if the instance is running a MongoDB server; `true` once a process
has spawned and the contained MongoDB server is ready to service requests.

#### Mongod#isClosing

Determine if the instance is closing a MongoDB server; `true` while a
process is being, or about to be, killed until the contained MongoDB server
either closes or errs.

### Events

#### stdout

Emitted when a MongoDB server prints to stdout or stderr.

#### opening

Emitted when attempting to start a MongoDB server.

#### open

Emitted when a MongoDB server becomes ready to service requests.

#### closing

Emitted when attempting to stop a MongoDB server.

#### close

Emitted when a MongoDB server closes.

## Credits

A special thanks to @ForbesLindesay for contributing the NPM package name.
