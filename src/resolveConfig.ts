import { UserConfig } from 'vite'
import merge from 'merge'

/**
 * Merge default plugin configuration with user one
 */
const resolveConfig = (...configs: UserConfig[]): UserConfig => merge.recursive(...configs)

export default resolveConfig
