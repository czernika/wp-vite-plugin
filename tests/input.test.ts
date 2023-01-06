import { test, expect, vi } from 'vitest'
import Resolver from '../src/resolver'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

test.each([
    {
        config: {
            input: 'resources/js/app.js',
            theme: 'web/app/themes/wolat',
        },
        input: '/path/to/web/app/themes/wolat/resources/js/app.js'
    },
    {
        config: {
            input: ['resources/js/app.js', 'resources/css/app.css'],
            theme: 'web/app/themes/wolat',
        },
        input: [
            '/path/to/web/app/themes/wolat/resources/js/app.js',
            '/path/to/web/app/themes/wolat/resources/css/app.css',
        ]
    },
    {
        config: {
            input: {
                some: 'resources/js/app.js'
            },
            theme: 'web/app/themes/wolat',
        },
        input: {
            some: '/path/to/web/app/themes/wolat/resources/js/app.js',
        }
    },
])('it asserts provided input resolved correctly into rollup input', ({config, input}) => {
    const resolver = new Resolver(config)
    expect(resolver.getInput()).toStrictEqual(input)
})
