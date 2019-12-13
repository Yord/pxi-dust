![@pf/base teaser][teaser]

`@pf/base` is a plugin with basic operations for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![npm version](https://img.shields.io/npm/v/fx.svg?color=orange)](https://www.npmjs.com/package/fx)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?color=green)][license]
[![unit tests status](https://github.com/Yord/pf-base/workflows/unit%20tests/badge.svg?branch=master)][actions]

## Installation

> :ok_hand: `@pf/base` comes preinstalled in `pf`. No installation necessary. If you still want to install it, proceed as described below.

`pf` requires **node v8.3.0** or higher.

Usually, `@pf/base` is installed in `~/.pfrc/` as follows:

```bash
npm install @pf/base
```

The plugin is included in `~/.pfrc/index.js` as follows:

```js
const basePlugin = require('@pf/base')

module.exports = {
  plugins:  [basePlugin],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`pf` repository][pf].

## License

`@pf/base` is [MIT licensed][license].

[license]: https://github.com/Yord/pf-base/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pf-base/actions