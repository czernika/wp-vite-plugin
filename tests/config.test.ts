import { it, expect, vi } from 'vitest'
import { UserConfig } from 'vite'
import resolveConfig from '../src/resolveConfig'
import resolveInput from '../src/resolveInput'

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

it('asserts theme root resolves full path', () => {
    expect(resolveInput({
        input: 'resources/js/app.js',
        theme: 'wp-content/themes/test'
    })).toMatchObject('/path/to/wp-content/themes/test/resources/js/app.js')
})
