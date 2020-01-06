![@pfx/base teaser][teaser]

`@pfx/base` is a plugin with basic operations for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![node version][shield-node]][node]
[![npm version][shield-npm]][npm-package]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]
[![linux unit tests status][shield-unit-tests-linux]][actions]
[![macos unit tests status][shield-unit-tests-macos]][actions]
[![windows unit tests status][shield-unit-tests-windows]][actions]

## Installation

> :ok_hand: `@pfx/base` comes preinstalled in `pf`. No installation necessary. If you still want to install it, proceed as described below.

`@pfx/base` is installed in `~/.pfrc/` as follows:

```bash
npm install @pfx/base
```

The plugin is included in `~/.pfrc/index.js` as follows:

```js
const base = require('@pfx/base')

module.exports = {
  plugins:  [base],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`.pfrc` module documentation][pfrc-module].

## Extensions

This plugin comes with the following `pf` extensions:

|                      | Description                                                                                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `line` lexer         | Divides data on line breaks. A lot of data formats like CSV, TSV, and JSON line build on this separation.                                                                                       |
| `map` applicator     | Applies `pf`'s functions to each individual line. Always returns a single result, unless an error is thrown during function application.                                                        |
| `flatMap` applicator | Applies `pf`'s functions to each individual line. May return any number of results, including none, thus being able to change the length of a file.                                             |
| `filter` applicator  | Treats `pf`'s functions as a conjunction of predicates and applies it to each individual line. If any predicate is false, the line is dropped, if all predicates return true, the line is kept. |
| `string` marshaller  | Serializes each transformed JSON into a string separated by newlines.                                                                                                                           |

## Reporting Issues

Please report issues [in the tracker][issues]!

## License

`@pfx/base` is [MIT licensed][license].

[actions]: https://github.com/Yord/pfx-base/actions
[contribute]: https://github.com/Yord/pf
[issues]: https://github.com/Yord/pf/issues
[license]: https://github.com/Yord/pfx-base/blob/master/LICENSE
[node]: https://nodejs.org/
[npm-package]: https://www.npmjs.com/package/@pfx/base
[pf]: https://github.com/Yord/pf
[pfrc-module]: https://github.com/Yord/pf#pfrc-module
[shield-license]: https://img.shields.io/npm/l/@pfx/base?color=yellow&labelColor=313A42
[shield-node]: https://img.shields.io/node/v/@pfx/base?color=red&labelColor=313A42
[shield-npm]: https://img.shields.io/npm/v/@pfx/base.svg?color=orange&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[shield-unit-tests-linux]: https://github.com/Yord/pfx-base/workflows/linux/badge.svg?branch=master
[shield-unit-tests-macos]: https://github.com/Yord/pfx-base/workflows/macos/badge.svg?branch=master
[shield-unit-tests-windows]: https://github.com/Yord/pfx-base/workflows/windows/badge.svg?branch=master
[teaser]: ./teaser.gif