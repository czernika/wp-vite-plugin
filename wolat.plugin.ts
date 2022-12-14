import { Plugin, UserConfig } from 'vite'
import type Config from './types/Config'
import merge from 'merge'
import resolveInput from './src/resolveInput'
import output from './src/resolveOutput'

export default function wordPressWolat(config: Config) {
    return {
        name: 'wolat',

        config: (userConfig: UserConfig) => {

            const pluginConfig = merge.recursive({
                build: {
                    rollupOptions: {
                        output,
                        input: resolveInput(config),
                    }
                },
            }, userConfig)

            return pluginConfig
        },

    } as Plugin
}
