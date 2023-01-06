import { Config as LiveReloadConfig } from 'vite-plugin-live-reload'

/**
 * Rollup input interface
 *
 * @example
 * {'app': 'resources/js/app.js'}
 */
export interface EntryInterface {
    [entryName: string]: string
}

export interface LiveReloadConfigInterface {
    paths: string | string[]
    config?: LiveReloadConfig
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
     */
    reload?: string | string[] | LiveReloadConfigInterface
}

/**
 * Plugin configuration type
 */
export type Config = ConfigInterface

/**
* Rollup input
*/
export type Input = string | string[] | EntryInterface
