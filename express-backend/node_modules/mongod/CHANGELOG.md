# mongod

This project adheres to [Semantic Versioning](http://semver.org/). Notable
changes to this project will be documented in this file for which the format
is based on [Keep a Changelog](http://keepachangelog.com/).

### [2.0.0][] - 2017-01-17

#### Added

- Support for NPM install
- Lint markdown with remark

### [1.0.0][] — 2017-01-16

#### Added

- Changelog

#### Fixed

- “stdout” event not emitted for stderr

---

### [0.2.0][] — 2017-01-08

#### Added

- Support for `--nojournal` (`Mongod~Config#nojournal`)

---

### [0.1.0][] — 2017-01-08

#### Added

- Support for `--storageEngine` (`Mongod~Config#storageEngine`)
- “open” and “close” events

#### Changed

- Update dev dependencies
  - eslint 3.13.0

#### Fixed

- Errors when calling `#open()` or `#close()` repetitiously

---

### [0.0.1][] — 2016-12-24

#### Added

- Initial release

[2.0.0]: https://github.com/BrandonZacharie/node-mongod/compare/1.0.0...2.0.0
[1.0.0]: https://github.com/BrandonZacharie/node-mongod/compare/0.2.0...1.0.0
[0.2.0]: https://github.com/BrandonZacharie/node-mongod/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/BrandonZacharie/node-mongod/compare/0.0.1...0.1.0 
[0.0.1]: https://github.com/BrandonZacharie/node-mongod/compare/694e8...0.0.1
