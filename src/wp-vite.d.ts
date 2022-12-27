/**
 * Rollup input interface
 *
 * @example
 * {'app': 'resources/js/app.js'}
 */
export interface EntryInterface {
    [entryName: string]: string
}

/**
 * Plugin configuration
 */
export interface ConfigInterface {

    /**
     * User input
     * @see https://rollupjs.org/guide/en/#input
     */
    input: string | string[] | EntryInterface

    /**
     * Theme root path
     * @default `web/app/themes/wolat`
     */
    theme?: string

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

/**
 * Plugin configuration type
 * string (or an array of strings) - source file inputs
 */
export type Config = string | string[] | ConfigInterface

/**
* Rollup input
*/
export type Input = string | string[] | EntryInterface
