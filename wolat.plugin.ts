import { Plugin, UserConfig } from 'vite'
import type Config from './types/Config'
import resolveInput from './src/resolveInput'
import output from './src/resolveOutput'
import resolveConfig from './src/resolveConfig'

export default function wordPressWolat(config: Config) {

    /**
     * Default plugin config object
     */
    const pluginConfig: UserConfig = {
        build: {
            rollupOptions: {
                output,
                input: resolveInput(config),
            }
        },
    }

    return {
        name: 'wolat',

        config: (userConfig: UserConfig) => {
            const resolvedPluginConfig = resolveConfig(pluginConfig, userConfig)

            return resolvedPluginConfig
        },

    } as Plugin
}
