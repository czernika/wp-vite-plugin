import type Config from '@src/types/Config'
import type Input from '@src/types/Input'
import * as path from 'path'
import ConfigInterface from '@src/interfaces/ConfigInterface'
import { defaultThemeRootPath } from '@src/resolveThemeRoot'

const resolveInput = (config: Config): Input => {
    let themeRoot = defaultThemeRootPath
    let input: Input = resolveNonObjectConfig(config, themeRoot)

    /**
     * User passed input Config object
     *
     * @example
     * wolat({input: {app: 'resources/js/app.js'}})
     * wolat({input: 'resources/js/app.js'})
     */
    if (typeof config === 'object' && !Array.isArray(config)) {
        const configInput = (config as ConfigInterface).input
        themeRoot = config.theme ?? themeRoot

        /**
         * It still may contain simple string or an array
         */
        input = resolveNonObjectConfig(config.input as Config, themeRoot)

        if (typeof config.input === 'object' && !Array.isArray(config.input)) {
            Object.keys(configInput).forEach(key => {
                input[key] = mapInput(config.input[key], themeRoot)
            })
        }
    }

    return input
}

/**
 * Resolve configuration when it is NOT an config object
 */
const resolveNonObjectConfig = (config: Config, themeRoot: string): Input => {
    let input: Input = {}

    /**
     * User passed single file as input
     *
     * @example
     * wolat('resources/js/app.js')
     */
    if (typeof config === 'string') {
        input = mapInput(config, themeRoot)
    }

    /**
     * User passed multiple files
     *
     * @example
     * wolat(['resources/js/app.js'])
     */
    if (Array.isArray(config)) {
        input = config.map((entry) => mapInput(entry, themeRoot))
    }

    return input
}

/**
 * Resolve entrypoint path based on theme path
 */
const mapInput = (input: string, themeRoot: string): string => path.resolve(themeRoot, input)

export default resolveInput
