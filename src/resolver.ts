import * as path from 'path'
import merge from 'merge'
import { configEntryExists, configIsObject } from './helpers/configIsObject'
import { ConfigInterface, EntryInterface, Input } from '../index'
import { UserConfig } from 'vite'
import { OutputOptions } from 'rollup'
import { Config as LiveReloadConfig } from 'vite-plugin-live-reload'

class Resolver {

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

    /**
     * Server host name
     */
    host = '127.0.0.1'

    /**
     * Port value
     */
    port = 5173

    /**
     * Default reload file patterns
     */
    reloadPaths = ['./index.php']

    constructor (readonly config: ConfigInterface) {
        // ...
    }

    /**
     * Get live reload plugin config
     */
    getReloadConfig(): LiveReloadConfig | undefined {
        if (configEntryExists(this.config, 'reload')) {
            const reloadConfig = this.config.reload

            if (typeof reloadConfig === 'object' && !Array.isArray(reloadConfig)) {
                return reloadConfig.config
            }
        }

        return undefined
    }

    /**
     * Get live reload plugin config paths
     */
    getReloadConfigPaths(): string | string[] {
        if (configEntryExists(this.config, 'reload')) {
            const reloadConfig = this.config.reload

            if (typeof reloadConfig === 'string') {
                return reloadConfig
            }

            if (Array.isArray(reloadConfig)) {
                return reloadConfig
            }

            if (typeof reloadConfig === 'object' && !Array.isArray(reloadConfig)) {
                return reloadConfig.paths
            }
        }

        return this.reloadPaths
    }

    /**
     * Get hot file name
     */
    getHotFileName(): string {
        if (configEntryExists(this.config, 'hot')) {
            this.setHotFileName(this.config.hot as string)
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
        let input: Input = {}

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

        return input
    }

    /**
     * Map input if it is not object
     */
    protected getNonObjectInput(config: ConfigInterface | EntryInterface): Input {
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
        return this.config.theme
    }

    /**
     * Get full output dir path
     */
    getOutputDir(): string {
        if (configEntryExists(this.config, 'outDir')) {
            this.setOutputDir(this.config.outDir as string)
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
                if (/png|jpe?g|gif|tiff|bmp|webp|ico/i.test(extension)) {
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
            this.setManifestFileName(this.config.manifest as string)
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
     * Get host name
     */
    getHostName(): string {
        return this.host
    }

    /**
     * Set host name
     */
    setHostName(host: string): void {
        this.host = host
    }

    /**
     * Get port
     */
    getPort(): number {
        return this.port
    }

    /**
     * Set port
     */
    setPort(port: number): void {
        this.port = port
    }

    /**
     * Get default plugin configuration
     */
    getPluginConfig(): UserConfig {
        return {
            root: this.getThemePath(),

            // These settings same as core Vite plugin options
            // and may be overridden by it - see no point to create extra settings
            server: {
                strictPort: true,
                port: this.getPort(),
                host: this.getHostName(),
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
