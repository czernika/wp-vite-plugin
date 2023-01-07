# WordPress Vite Plugin

Vite Plugin for WordPress environment. Works in pair with [Vite Assets Loader](https://github.com/czernika/wp-vite)

[![Running Tests](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml/badge.svg)](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml) [![Latest Tag](https://img.shields.io/github/v/tag/czernika/wp-vite-plugin)](https://github.com/czernika/wp-vite-plugin/releases)

## Installation

> In progress

For now may be resolved as `package.json` dependency from master branch

```json
{
    "wordpress-wolat": "git+ssh://git@github.com:czernika/wp-vite-plugin.git#master"
}
```

## Usage

Install it as dependency and require within plugins section of `vite.config.js` file

```js
// vite.config.js

import { defineConfig } from 'vite'
import wordPressWolat from 'wordpress-wolat'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		wordPressWolat({
            theme: 'web/app/themes/kawa',
            input: 'resources/js/app.js',
        }),
	],
})
```

Other plugin settings:

| Setting | Meaning | Type | Default |
| --- | --- | --- | --- |
| `theme` | Project root. In WordPress terms where all theme resources are located | `string` | None. **Required** |
| `input` | User input. List of required resources related to `theme` path | `string \| string[] \| EntryInterface` | None. **Required** |
| `manifest` | Generated manifest file name | `string` | `manifest.json` |
| `outDir` | Where all generated file should be placed | `string` | `dist` |
| `hot` | Hot file name - special file which resolves environment type | `string` | `hot` |
| `reload` | List of file patterns which will cause page reloading if changed | `string \| string[] \| LiveReloadConfigInterface` | `[./index.php]` |

```ts
interface ConfigInterface {

    /**
     * User input
     * @see https://rollupjs.org/guide/en/#input
     */
    input: string | string[] | EntryInterface

    /**
     * Theme root path
     */
    theme: string

    /**
     * Manifest file name
     * @default 'manifest.json'
     */
    manifest?: string

    /**
     * Output directory
     * @default `dist`
     */
    outDir?: string

    /**
     * Hot file name
     * @default `hot`
     */
    hot?: string

    /**
     * Reload options
     * @see https://github.com/arnoson/vite-plugin-live-reload
     */
    reload?: string | string[] | LiveReloadConfigInterface
}
```

### Overriding settings

Every plugin setting may be overwritten by Vite config file. For example rollup input will override plugin entrypoint

```js
export default defineConfig({
    build: {
        rollupOptions: {
            input: 'resources/js/app.js',
        }
    },

	plugins: [
		wordPressWolat({
            theme: 'web/app/themes/my-theme',
            input: 'resources/js/common.js',
        }),
	],
})
```

Despite plugin requires `common.js` file `app.js` will be used as Vite config has more priority

### Server settings

Default server host is `127.0.0.1` (both server and HMR) and port is `5173`. If you wish to override this, provide Vite server configuration

```js
export default defineConfig({
    server: {
        host: 'some.host',
        port: 5555,
    },

	plugins: [
		wordPressWolat({
            theme: 'web/app/themes/my-theme',
            input: 'resources/js/common.js',
        }),
	],
})
```

> This feature is under testing and may be changed

### Output

Plugin generates files depends on extension - styles goes into `css` directory, scripts into `js`, SVG icons - `icons`, images with following regex `png|jpe?g|gif|tiff|webp|bmp|ico` into `images`, all chunks are generated with `js/chunks`

Output file name is `directory/name.hash.extension`

### Preload polyfill

Add these lines into entrypoint file

```js
// https://vitejs.dev/guide/backend-integration.html#backend-integration
import 'vite/modulepreload-polyfill' 

// [BUG?] If no hot reload happening try to add
// import.meta.hot 
```

## Known issues

- Full page reload will not happen unless you import CSS file within JS-entrypoint or add `import.meta.hot` line into it

## TODO

- [ ] - Add API for server settings
- [ ] - Add API for chunking strategy
- [ ] - Test HMR more

## License

Open-source under [MIT license](LICENSE.md)