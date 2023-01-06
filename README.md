# WordPress Wolat Vite Plugin

[![Running Tests](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml/badge.svg)](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml) [![Latest Tag](https://img.shields.io/github/v/tag/czernika/wp-vite-plugin)](https://github.com/czernika/wp-vite-plugin/releases)

Vite Plugin for WordPress environment. Works in pair with [Vite Assets loader](https://github.com/czernika/wp-vite)

## Usage

```js
// vite.config.js

import { defineConfig } from 'vite'
import wordPressWolat from 'wordpress-wolat'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		wordPressWolat({
            theme: 'web/app/themes/kawa', // project root
            input: 'resources/js/app.js', // entrypoint (relative to theme root)
        }),
	],
})
```

Plugin settings:

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
}
```

## Installation

> In progress: will be released as npm package

For now may be resolved as `package.json` dependency - change VERSION with latest release tag

```json
{
    "wordpress-wolat": "git+ssh://git@github.com:czernika/wp-vite-plugin.git#VERSION"
}
```

## License

Open-source under [MIT license](LICENSE.md)