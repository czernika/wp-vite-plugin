import Config from '../../types/Config'
import configIsObject from './configIsObject'

/**
 * Resolve config value by key or default value if none is present
 */
const getConfigValue = <T>(config: Config, key: string, defaultValue: T): T => {
    if (!configIsObject(config)) {
        return defaultValue
    }

    return config[key] ?? defaultValue
}

export default getConfigValue
