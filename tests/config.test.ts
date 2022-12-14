import { it, expect, vi, test } from 'vitest'
import { UserConfig } from 'vite'
import Resolver from '../src/resolver'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

// TODO refactor this test case
it('asserts configs were merged', () => {
    const pluginConfig: UserConfig = {
        build: {
            rollupOptions: {
                input: 'resources/common/js',
                output: {
                    entryFileNames: 'js/[name].[hash].js',
                }
            }
        }
    }

    const userConfig: UserConfig = {
        build: {
            rollupOptions: {
                input: 'resources/app/js',
                output: {
                    chunkFileNames: 'js/chunks/[name].[hash].js',
                }
            }
        }
    }

    const resolved = new Resolver(pluginConfig).getResolvedConfig(userConfig)

    expect(resolved).toMatchSnapshot()
})

it('asserts config resolves output directory', () => {
    const resolver = new Resolver({
        input: 'resources/js/app.js',
        theme: 'wp-content/themes/test'
    })
    expect(resolver.getInput()).toMatchObject('/path/to/wp-content/themes/test/resources/js/app.js')
})

test.each([
    {
        config: 'resources/js/app.js',
        outDir: 'web/app/themes/wolat/dist'
    },
    {
        config: ['resources/js/app.js'],
        outDir: 'web/app/themes/wolat/dist'
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        outDir: 'web/app/themes/wolat/dist'
    },
    {
        config: {
            input: 'resources/js/app.js',
            outDir: 'public'
        },
        outDir: 'web/app/themes/wolat/public'
    },
    {
        config: {
            input: 'resources/js/app.js',
            outDir: 'public',
            theme: 'wp-content/themes/my-theme'
        },
        outDir: 'wp-content/themes/my-theme/public'
    },
])('it asserts provided input resolved correctly output directory', ({config, outDir}) => {
    const resolver = new Resolver(config)
    expect(resolver.getOutputDir()).toStrictEqual(outDir)
})

test.each([
    {
        config: 'resources/js/app.js',
        root: 'web/app/themes/wolat'
    },
    {
        config: ['resources/js/app.js'],
        root: 'web/app/themes/wolat'
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        root: 'web/app/themes/wolat'
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'wp-content/themes/my-theme'
        },
        root: 'wp-content/themes/my-theme'
    },
])('it asserts provided input resolved correctly root', ({config, root}) => {
    const resolver = new Resolver(config)
    expect(resolver.getThemePath()).toStrictEqual(root)
})

test.each([
    {
        config: 'resources/js/app.js',
        manifest: 'manifest.json'
    },
    {
        config: ['resources/js/app.js'],
        manifest: 'manifest.json'
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        manifest: 'manifest.json'
    },
    {
        config: {
            input: 'resources/js/app.js',
            manifest: 'assets.json'
        },
        manifest: 'assets.json'
    },
])('it asserts provided input resolved correctly manifest input', ({config, manifest}) => {
    const resolver = new Resolver(config)
    expect(resolver.getManifestFileName()).toStrictEqual(manifest)
})
