import Config from '../types/Config'
import getConfigValue from './helpers/getConfigValueOrDefault'

/**
 * Get manifest file name form config
 * @default true
 */
const resolveManifestFile = (config: Config): string | true => {
    return getConfigValue<string | true>(config, 'manifest', true)
}

export default resolveManifestFile
