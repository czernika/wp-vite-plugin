import { EntryInterface, ConfigInterface } from '../../index'

/**
 * Determine if given config is object
 */
const configIsObject = (config: ConfigInterface | EntryInterface): boolean => (typeof config === 'object' && !Array.isArray(config))

/**
 * Check if passed instance is object and its key exists
 */
const configEntryExists = (config: ConfigInterface, key: keyof ConfigInterface): config is ConfigInterface => {
    return (configIsObject(config) && typeof (config as ConfigInterface)[key] !== 'undefined')
}

export { configIsObject, configEntryExists }
