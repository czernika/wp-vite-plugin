import { it, expect, vi, test } from 'vitest'
import { UserConfig } from 'vite'
import resolveConfig from '../src/resolveConfig'
import resolveInput from '../src/resolveInput'
import { resolveOutDir } from '../src/resolveOutput'
import resolveThemeRoot from '../src/resolveThemeRoot'
import resolveManifestFile from '../src/resolveManifestFile'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

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

    const resolved = resolveConfig(pluginConfig, userConfig)

    expect(resolved).toMatchSnapshot()
})

it('asserts config resolves output directory', () => {
    expect(resolveInput({
        input: 'resources/js/app.js',
        theme: 'wp-content/themes/test'
    })).toMatchObject('/path/to/wp-content/themes/test/resources/js/app.js')
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
    expect(resolveOutDir(config)).toStrictEqual(outDir)
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
    expect(resolveThemeRoot(config)).toStrictEqual(root)
})

test.each([
    {
        config: 'resources/js/app.js',
        manifest: true
    },
    {
        config: ['resources/js/app.js'],
        manifest: true
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        manifest: true
    },
    {
        config: {
            input: 'resources/js/app.js',
            manifest: 'assets.json'
        },
        manifest: 'assets.json'
    },
])('it asserts provided input resolved correctly manifest input', ({config, manifest}) => {
    expect(resolveManifestFile(config)).toStrictEqual(manifest)
})
