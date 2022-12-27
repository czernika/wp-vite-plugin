import { it, expect, vi, test } from 'vitest'
import { UserConfig } from 'vite'
import { OutputOptions } from 'rollup'
import Resolver from '../src/resolver'
import type { Config } from '../src/wp-vite'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

it('asserts configs were merged and user config overrides default one', () => {
    const defaultConfig: Config = {
        input: 'resources/js/common.js'
    }

    const viteConfig: UserConfig = {
        build: {
            rollupOptions: {

                // this input should override `common.js` input from provided vite config
                input: 'resources/js/app.js',
                output: {
                    chunkFileNames: 'js/chunks/[name].[hash].js',
                }
            }
        }
    }

    const resolved = new Resolver(defaultConfig).getResolvedConfig(viteConfig)
    const options = resolved.build?.rollupOptions

    expect(options?.input).toBe('resources/js/app.js')
    expect((options?.output as OutputOptions).chunkFileNames).toBe('js/chunks/[name].[hash].js')
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
        outDir: 'dist'
    },
    {
        config: ['resources/js/app.js'],
        outDir: 'dist'
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        outDir: 'dist'
    },
    {
        config: {
            input: 'resources/js/app.js',
            outDir: 'public'
        },
        outDir: 'public'
    },
    {
        config: {
            input: 'resources/js/app.js',
            outDir: 'public',
            theme: 'wp-content/themes/my-theme'
        },
        outDir: 'public'
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

test.each([
    {
        config: {
            input: 'resources/js/app.js'
        },
        hot: 'hot'
    },
    {
        config: {
            input: 'resources/js/app.js',
            hot: 'hot-file'
        },
        hot: 'hot-file'
    },
])('it asserts provided input resolved correctly manifest input', ({config, hot}) => {
    const resolver = new Resolver(config)
    expect(resolver.getHotFileName()).toStrictEqual(hot)
})
