# WordPress Wolat Vite Plugin

[![Running Tests](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml/badge.svg)](https://github.com/czernika/wp-vite-plugin/actions/workflows/tests.yml)

Vite Plugin for WordPress Wolat environment. Works in pair with [Vite Wolat PHP loader](https://github.com/czernika/wp-vite)

## Usage

```
// vite.config.js
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

```json
// package.json

{
    "wordpress-wolat": "git+ssh://git@github.com:czernika/wp-vite-plugin.git#0.0.7-rc"
}
```

## License

Open-source under [MIT license](LICENSE.md)