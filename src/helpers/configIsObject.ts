import { EntryInterface, ConfigInterface, Config } from '../../wp-vite'

/**
 * Determine if given config is object
 */
const configIsObject = (config: Config | EntryInterface): boolean => (typeof config === 'object' && !Array.isArray(config))

/**
 * Check if passed instance is object and its key exists
 */
const configEntryExists = (config: Config, key: keyof ConfigInterface): config is ConfigInterface => {
    return (configIsObject(config) && typeof (config as ConfigInterface)[key] !== 'undefined')
}

export { configIsObject, configEntryExists }
