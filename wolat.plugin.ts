import { Plugin, UserConfig } from 'vite'
import resolveInput from './src/resolveInput'
import type Config from './types/Config'

export default function wordPressWolat(config: Config) {
    return {
        name: 'wolat',

        config: (userConfig: UserConfig) => ({
            build: {
                rollupOptions: {
                    input: resolveInput(config),
                }
            },
        }),

    } as Plugin
}
