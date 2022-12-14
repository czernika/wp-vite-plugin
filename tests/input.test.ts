import { test, expect, vi } from 'vitest'
import resolveInput from '../src/resolveInput'

vi.mock('path', () => {
    return {
        resolve: (...args: string[]): string => ['/path/to', ...args].join('/')
    }
})

test.each([
    {
        config: 'resources/js/app.js',
        input: '/path/to/web/app/themes/wolat/resources/js/app.js'
    },
    {
        config: ['resources/js/app.js', 'resources/css/app.css'],
        input: [
            '/path/to/web/app/themes/wolat/resources/js/app.js',
            '/path/to/web/app/themes/wolat/resources/css/app.css',
        ]
    },
    {
        config: {
            input: {
                some: 'resources/js/app.js'
            }
        },
        input: {
            some: '/path/to/web/app/themes/wolat/resources/js/app.js',
        }
    },
    {
        config: {
            input: 'resources/js/app.js'
        },
        input: '/path/to/web/app/themes/wolat/resources/js/app.js',
    },
    {
        config: {
            input: ['resources/js/app.js']
        },
        input: ['/path/to/web/app/themes/wolat/resources/js/app.js'],
    },
])('it asserts provided input resolved correctly into rollup input', ({config, input}) => {
    expect(resolveInput(config)).toStrictEqual(input)
})
