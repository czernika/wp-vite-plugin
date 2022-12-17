import { Plugin, UserConfig, ViteDevServer } from 'vite'
import type Config from '@src/types/Config'
import Resolver from '@src/resolver'
import Server from './server'

export default function wordPressWolat(config: Config): Plugin {
    const resolver = new Resolver(config)

    return {
        name: 'wordpress-wolat',

        config: (userConfig: UserConfig) => resolver.getResolvedConfig(userConfig),

        configureServer (server) {
            return new Server(resolver, server).configure()
        }
    }
}
