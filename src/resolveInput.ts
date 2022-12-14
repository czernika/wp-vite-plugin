import type Config from '../types/Config'
import type Input from '../types/Input'
import * as path from 'path'
import ConfigInterface from '../interfaces/ConfigInterface'
import getThemePath from './getThemePath'

const resolveInput = (config: Config): Input => {
    let input: Input = {}

    /**
     * User passed single file as input
     *
     * @example
     * wolat('resources/js/app.js')
     */
    if (typeof config === 'string') {
        input = mapInput(config)
    }

    /**
     * User passed multiple files
     *
     * @example
     * wolat(['resources/js/app.js'])
     */
    if (Array.isArray(config)) {
        input = config.map((entry) => mapInput(entry))
    }

    /**
     * User passed input Config object
     *
     * @example
     * wolat({input: {app: 'resources/js/app.js'}})
     */
    if (typeof config === 'object' && !Array.isArray(config)) {
        const configInput = (config as ConfigInterface).input
        Object.keys(configInput).forEach(key => {
            input[key] = mapInput(configInput[key])
        })
    }

    return input
}

/**
 * Resolve entrypoint path based on theme path
 */
const mapInput = (input: string): string => path.resolve(getThemePath(), input)

export default resolveInput
