import Config from '../types/Config'
import getConfigValue from './helpers/getConfigValueOrDefault'

/**
 * Default theme root path if no other was specified
 */
const defaultThemeRootPath = 'web/app/themes/wolat'

/**
 * Resolve theme root path
 */
const resolveThemeRoot = (config: Config): string => {
    return getConfigValue<string>(config, 'theme', defaultThemeRootPath)
}

export {defaultThemeRootPath}

export default resolveThemeRoot