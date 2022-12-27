import { Plugin, UserConfig, ViteDevServer } from 'vite'
import type { Config } from './wp-vite'
import Resolver from './resolver'
import Server from './server'

export default function wordPressWolat(config: Config): Plugin {
    const resolver = new Resolver(config)

    return {
        name: 'wordpress-wolat',

        config: (userConfig: UserConfig) => resolver.getResolvedConfig(userConfig),

        configureServer (server: ViteDevServer) {
            return new Server(resolver, server).configure()
        }
    }
}
