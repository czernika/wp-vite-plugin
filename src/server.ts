import { Connect, ViteDevServer } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import Resolver from './resolver'

class Server {

    constructor(protected resolver: Resolver, protected server: ViteDevServer) {
        // ...
    }

    /**
     * Get full path for hot file
     */
    public getHotFilePath(): string {
        return path.resolve(this.resolver.getThemePath(), this.resolver.getOutputDir(), this.resolver.getHotFileName())
    }

    /**
     * Create hot file during development
     */
    protected createHotFile(): void {
        this.server.httpServer?.once('listening', () => {
            fs.writeFileSync(this.getHotFilePath(), '// This file should not be present on production server')
        })
    }

    /**
     * Delete hot file
     */
    protected deleteHoFile(): void {
        const clean = (): void => {
            if (fs.existsSync(this.getHotFilePath())) {
                fs.rmSync(this.getHotFilePath())
            }
        }

        process.on('exit', clean)

        process.on('SIGINT', process.exit)
        process.on('SIGTERM', process.exit)
        process.on('SIGHUP', process.exit)
    }

    /**
     * Show Vite server page on server port
     */
    protected showViteServerPage(page = '../server.html'): () => Connect.Server {
        return () => this.server.middlewares.use((req, res, next) => {
            if (req.url === '/index.html') {
                res.statusCode = 404

                res.end(
                    fs.readFileSync(path.join(__dirname, page)).toString()
                )
            }

            next()
        })
    }

    /**
     * Configure Vite server
     */
    configure(): () => Connect.Server {
        this.createHotFile()
        this.deleteHoFile()

        return this.showViteServerPage()
    }

}

export default Server
