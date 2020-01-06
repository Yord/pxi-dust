![@pfx/base teaser][teaser]

`@pfx/base` is a plugin with basic operations for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![node version][node-shield]][node]
[![npm version][npm-shield]][npm-package]
[![license][license-shield]][license]
[![PRs Welcome][prs-shield]][pfx-how-to-contribute]
[![linux unit tests status][linux-unit-tests-shield]][actions]
[![macos unit tests status][macos-unit-tests-shield]][actions]
[![windows unit tests status][windows-unit-tests-shield]][actions]

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

For a much more detailed description, see the [`.pfrc` module documentation][pf-pfrc-module] in the [`pf` repository][pf].

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

Please report issues [at the `pf` repository][issues]!

## License

`@pfx/base` is [MIT licensed][license].

[npm-package]: https://www.npmjs.com/package/@pfx/base
[license]: https://github.com/Yord/pfx-base/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pfx-base/actions
[npm-shield]: https://img.shields.io/npm/v/@pfx/base.svg?color=orange
[license-shield]: https://img.shields.io/npm/l/@pfx/base?color=yellow
[node-shield]: https://img.shields.io/node/v/@pfx/base?color=red
[node]: https://nodejs.org/
[prs-shield]: https://img.shields.io/badge/PRs-welcome-green.svg
[pfx-how-to-contribute]: https://github.com/Yord/pf
[linux-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/linux/master?label=linux&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[macos-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/macos/master?label=macos&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[windows-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/windows/master?label=windows&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[issues]: https://github.com/Yord/pf/issues
[pf-pfrc-module]: https://github.com/Yord/pf#pfrc-module