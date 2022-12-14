import Config from '../../types/Config'

/**
 * Determine if given config is object
 */
const configIsObject = (config: Config): boolean => (typeof config === 'object' && !Array.isArray(config))

export default configIsObject
