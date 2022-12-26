import * as path from 'path'
import merge from 'merge'
import { configEntryExists, configIsObject } from './helpers/configIsObject'
import ConfigInterface from './interfaces/ConfigInterface'
import EntryInterface from './interfaces/EntryInterface'
import type Config from './types/Config'
import type Input from './types/Input'
import { UserConfig } from 'vite'
import { OutputOptions } from 'rollup'

class Resolver {

    /**
     * Default theme root path
     * Basically root for Vite and every entrypoint
     */
    themeRoot = 'web/app/themes/wolat'

    /**
     * Output directory name
     * This passed is resolved relatively to theme root
     */
    outDir = 'dist'

    /**
     * Manifest filename
     */
    manifest = 'manifest.json'

    /**
     * Hot file name
     */
    hot = 'hot'

    constructor (readonly config: Config) {
        // ...
    }

    /**
     * Get hot file name
     */
    getHotFileName(): string {
        if (configEntryExists(this.config, 'hot')) {
            this.setHotFileName((this.config as ConfigInterface).hot as string)
        }

        return this.hot
    }

    /**
     * Set hot file name
     */
    setHotFileName(hot: string): void {
        this.hot = hot
    }

    /**
     * Get Rollup inputs
     */
    getInput(): Input {
        let input = this.getNonObjectInput(this.config)

        /**
         * User passed input Config object
         *
         * @example
         * wolat({input: {app: 'resources/js/app.js'}})
         * wolat({input: 'resources/js/app.js'})
         */
        if (configIsObject(this.config)) {
            const configInput = (this.config as ConfigInterface).input as EntryInterface

            /**
             * It still may contain simple string or an array
             */
            input = this.getNonObjectInput(configInput)

            if (configIsObject(configInput)) {
                Object.keys(configInput).forEach(key => {

                    // @ts-ignore: Using dynamic keys as entrypoint
                    input[key] = this.mapInput(configInput[key])
                })
            }
        }

        return input
    }

    /**
     * Map input if it is not object
     */
    protected getNonObjectInput(config: Config | EntryInterface): Input {
        let input: Input = {}

        /**
         * User passed single file as input
         *
         * @example
         * wolat('resources/js/app.js')
         */
        if (typeof config === 'string') {
            input = this.mapInput(config)
        }

        /**
         * User passed multiple files
         *
         * @example
         * wolat(['resources/js/app.js'])
         */
        if (Array.isArray(config)) {
            input = config.map((entry) => this.mapInput(entry))
        }

        return input
    }

    /**
     * Resolve full path for input entry
     */
    protected mapInput(entry: string): string {
        return path.resolve(this.getThemePath(), entry)
    }

    /**
     * Get theme root path where all resources are located
     */
    getThemePath(): string {
        if (configEntryExists(this.config, 'theme')) {
            this.setThemePath((this.config as ConfigInterface).theme as string)
        }

        return this.themeRoot
    }

    /**
     * Set theme root path
     */
    setThemePath(themeRoot: string): void {
        this.themeRoot = themeRoot
    }

    /**
     * Get full output dir path
     */
    getOutputDir(): string {
        if (configEntryExists(this.config, 'outDir')) {
            this.setOutputDir((this.config as ConfigInterface).outDir as string)
        }

        return this.outDir
    }

    /**
     * Set output dir name
     */
    setOutputDir(outDir: string): void {
        this.outDir = outDir
    }

    /**
     * Get asset output options
     */
    protected getOutputOptions(): OutputOptions {
        return {
            assetFileNames: (assetInfo): string => {
                let extension = assetInfo.name?.split('.').at(1) as string ?? 'compiled'

                /**
                 * Images
                 */
                if (/png|jpe?g|gif|tiff|bmp|ico/i.test(extension)) {
                    extension = 'images'
                }

                /**
                 * SVG icons
                 */
                if (/svg/i.test(extension)) {
                    extension = 'icons'
                }

                /**
                 * Other types
                 */
                return `${extension}/[name].[hash][extname]`
            },
            chunkFileNames: 'js/chunks/[name].[hash].js',
            entryFileNames: 'js/[name].[hash].js',
        }
    }

    /**
     * Get manifest file name
     */
    getManifestFileName(): string {
        if (configEntryExists(this.config, 'manifest')) {
            this.setManifestFileName((this.config as ConfigInterface).manifest as string)
        }

        return this.manifest
    }

    /**
     * Set manifest file name
     */
    setManifestFileName(manifest: string): void {
        this.manifest = manifest
    }

    /**
     * Get default plugin configuration
     */
    getPluginConfig(): UserConfig {
        return {
            root: this.getThemePath(),

            server: {
                strictPort: true,
                port: 5173,

                // TODO change these settings
                https: false,
                host: '127.0.0.1',
            },

            build: {
                emptyOutDir: true,
                outDir: this.getOutputDir(),
                manifest: this.getManifestFileName(),
                rollupOptions: {
                    output: this.getOutputOptions(),
                    input: this.getInput(),
                }
            },
        }
    }

    /**
     * Get resolved config
     */
    getResolvedConfig (config: UserConfig): UserConfig {
        return merge.recursive(this.getPluginConfig(), config)
    }

}

export default Resolver
