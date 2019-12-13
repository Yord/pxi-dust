![@pfx/base teaser][teaser]

`@pfx/base` is a plugin with basic operations for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![npm version][npm-shield]][npm-package]
[![license][license-shield]][license]
[![unit tests status][unit-tests-shield]][actions]

## Installation

> :ok_hand: `@pfx/base` comes preinstalled in `pf`. No installation necessary. If you still want to install it, proceed as described below.

`pf` requires **node v8.3.0** or higher.

Usually, `@pfx/base` is installed in `~/.pfrc/` as follows:

```bash
npm install @pfx/base
```

The plugin is included in `~/.pfrc/index.js` as follows:

```js
const basePlugin = require('@pfx/base')

module.exports = {
  plugins:  [basePlugin],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`pf` repository][pf].

## License

`@pfx/base` is [MIT licensed][license].

[npm-package]: https://www.npmjs.com/package/@pfx/base
[license]: https://github.com/Yord/pfx-base/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pfx-base/actions
[npm-shield]: https://img.shields.io/npm/v/@pfx/base.svg?color=orange
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?color=green
[unit-tests-shield]: https://github.com/Yord/pfx-base/workflows/unit%20tests/badge.svg?branch=master