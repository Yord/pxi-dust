![pxi-base teaser][teaser]

🧚`pxi-base` is a plugin with basic operations for `pxi` (pixie), the small, fast and magic command-line data processor.

See the [`pxi` github repository][pxi] for more details!

[![node version][shield-node]][node]
[![npm version][shield-npm]][npm-package]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]
[![linux unit tests status][shield-unit-tests-linux]][actions]
[![macos unit tests status][shield-unit-tests-macos]][actions]
[![windows unit tests status][shield-unit-tests-windows]][actions]

## Installation

> :ok_hand: `pxi-base` comes preinstalled in `pxi`.
> No installation necessary.
> If you still want to install it, proceed as described below.

`pxi-base` is installed in `~/.pxi/` as follows:

```bash
npm install pxi-base
```

The plugin is included in `~/.pxi/index.js` as follows:

```js
const base = require('pxi-base')

module.exports = {
  plugins:  [base],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`.pxi` module documentation][pxi-module].

## Extensions

This plugin comes with the following `pxi` extensions:

|                      | Description                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `line` chunker       | Divides data on line breaks. A lot of data formats like CSV, TSV, and JSON line build on this separation.                                                                                        |
| `map` applicator     | Applies `pxi`'s functions to each individual line. Always returns a single result, unless an error is thrown during function application.                                                        |
| `flatMap` applicator | Applies `pxi`'s functions to each individual line. May return any number of results, including none, thus being able to change the length of a file.                                             |
| `filter` applicator  | Treats `pxi`'s functions as a conjunction of predicates and applies it to each individual line. If any predicate is false, the line is dropped, if all predicates return true, the line is kept. |
| `string` serializer  | Serializes each transformed JSON into a string separated by newlines.                                                                                                                            |

## Reporting Issues

Please report issues [in the tracker][issues]!

## License

`pxi-base` is [MIT licensed][license].

[actions]: https://github.com/Yord/pxi-base/actions
[contribute]: https://github.com/Yord/pxi
[issues]: https://github.com/Yord/pxi/issues
[license]: https://github.com/Yord/pxi-base/blob/master/LICENSE
[node]: https://nodejs.org/
[npm-package]: https://www.npmjs.com/package/pxi-base
[pxi]: https://github.com/Yord/pxi
[pxi-module]: https://github.com/Yord/pxi#pxi-module
[shield-license]: https://img.shields.io/npm/l/pxi-base?color=yellow&labelColor=313A42
[shield-node]: https://img.shields.io/node/v/pxi-base?color=red&labelColor=313A42
[shield-npm]: https://img.shields.io/npm/v/pxi-base.svg?color=orange&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[shield-unit-tests-linux]: https://github.com/Yord/pxi-base/workflows/linux/badge.svg?branch=master
[shield-unit-tests-macos]: https://github.com/Yord/pxi-base/workflows/macos/badge.svg?branch=master
[shield-unit-tests-windows]: https://github.com/Yord/pxi-base/workflows/windows/badge.svg?branch=master
[teaser]: ./teaser.gif