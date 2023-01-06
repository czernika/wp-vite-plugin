import { it, expect, vi, test } from 'vitest'
import { UserConfig } from 'vite'
import { OutputOptions } from 'rollup'
import Resolver from '../src/resolver'
import type { Config } from '../index'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

it('asserts configs were merged and user config overrides default one', () => {
    const defaultConfig: Config = {
        input: 'resources/js/common.js',
        theme: 'web/app/themes/wolat',
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
        config: {
            input: 'resources/js/common.js',
            theme: 'web/app/themes/wolat',
        },
        outDir: 'dist'
    },
    {
        config: {
            input: ['resources/js/app.js'],
            theme: 'web/app/themes/wolat',
        },
        outDir: 'dist'
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
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
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
        },
        root: 'web/app/themes/wolat'
    },
    {
        config: {
            input: ['resources/js/app.js'],
            theme: 'web/app/themes/wolat',
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
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
        },
        manifest: 'manifest.json'
    },
    {
        config: {
            input: ['resources/js/app.js'],
            theme: 'web/app/themes/wolat',
        },
        manifest: 'manifest.json'
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
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
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
        },
        hot: 'hot'
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
            hot: 'hot-file'
        },
        hot: 'hot-file'
    },
])('it asserts provided input resolved correctly manifest input', ({config, hot}) => {
    const resolver = new Resolver(config)
    expect(resolver.getHotFileName()).toStrictEqual(hot)
})

test.each([
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
            reload: './file/to/reload'
        },
        reloadPaths: './file/to/reload',
        reloadConfig: undefined,
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
            reload: ['./file/to/reload', './another-file']
        },
        reloadPaths: ['./file/to/reload', './another-file'],
        reloadConfig: undefined,
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
            reload: {
                paths: './file/to/reload',
                config: { alwaysReload: true }
            }
        },
        reloadPaths: './file/to/reload',
        reloadConfig: { alwaysReload: true },
    },
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
            reload: undefined
        },
        reloadPaths: ['./index.php'],
        reloadConfig: undefined,
    },
])('it asserts provided input resolved correctly manifest input', ({config, reloadPaths, reloadConfig}) => {
    const resolver = new Resolver(config)
    expect(resolver.getReloadConfig()).toStrictEqual(reloadConfig)
    expect(resolver.getReloadConfigPaths()).toStrictEqual(reloadPaths)
})
