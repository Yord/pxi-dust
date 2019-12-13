![@pfx/base teaser][teaser]

`@pfx/base` is a plugin with basic operations for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![npm version](https://img.shields.io/npm/v/fx.svg?color=orange)](https://www.npmjs.com/package/fx)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?color=green)][license]
[![unit tests status](https://github.com/Yord/pfx-base/workflows/unit%20tests/badge.svg?branch=master)][actions]

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

[license]: https://github.com/Yord/pfx-base/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pfx-base/actions