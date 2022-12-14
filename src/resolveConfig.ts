import { UserConfig } from 'vite'
import merge from 'merge'

const resolveConfig = (...configs: UserConfig[]): UserConfig => merge.recursive(...configs)

export default resolveConfig
