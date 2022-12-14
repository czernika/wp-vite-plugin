import { Plugin, UserConfig } from 'vite'
import type Config from '@src/types/Config'
import Resolver from '@src/resolver'

export default function wordPressWolat(config: Config): Plugin {
    return {
        name: 'wordpress-wolat',

        config: (userConfig: UserConfig) => new Resolver(config).getResolvedConfig(userConfig),
    }
}
