import ConfigInterface from '@src/interfaces/ConfigInterface'

/**
 * Plugin configuration type
 * string (or an array of strings) - source file inputs
 */
type Config = string | string[] | ConfigInterface

export default Config
