import { Plugin, UserConfig, ViteDevServer } from 'vite'
import { ConfigInterface } from '../index'
import Resolver from './resolver'
import Server from './server'

import { liveReload } from 'vite-plugin-live-reload'

export default function wordPressWolat(config: ConfigInterface): Plugin[] {
    const resolver = new Resolver(config)

    return [
        {
            name: 'wordpress-wolat',

            config: (userConfig: UserConfig) => resolver.getResolvedConfig(userConfig),

            configureServer (server: ViteDevServer) {
                return new Server(resolver, server).configure()
            }
        },

        liveReload(resolver.getReloadConfigPaths(), resolver.getReloadConfig()),
    ]
}
