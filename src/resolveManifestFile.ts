import Config from '@src/types/Config'
import getConfigValue from '@src/helpers/getConfigValueOrDefault'

/**
 * Get manifest file name form config
 * @default true
 */
const resolveManifestFile = (config: Config): string | true => {
    return getConfigValue<string | true>(config, 'manifest', true)
}

export default resolveManifestFile
