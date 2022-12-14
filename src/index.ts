import { Plugin, UserConfig } from 'vite'
import type Config from '@src/types/Config'
import resolveInput from '@src/resolveInput'
import output, { resolveOutDir } from '@src/resolveOutput'
import resolveConfig from '@src/resolveConfig'
import resolveThemeRoot from '@src/resolveThemeRoot'
import resolveManifestFile from '@src/resolveManifestFile'

export default function wordPressWolat(config: Config) {

    /**
     * Default plugin config object
     */
    const pluginConfig: UserConfig = {

        root: resolveThemeRoot(config),

        server: {
            strictPort: true,
            port: 5173
        },

        build: {
            outDir: resolveOutDir(config),

            emptyOutDir: true,

            manifest: resolveManifestFile(config),

            rollupOptions: {
                output,
                input: resolveInput(config),
            }
        },
    }

    return {
        name: 'wordpress-wolat',

        config: (userConfig: UserConfig) => {
            const resolvedPluginConfig = resolveConfig(pluginConfig, userConfig)

            return resolvedPluginConfig
        },

    } as Plugin
}
