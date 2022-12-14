import { EmittedAsset, OutputOptions } from 'rollup'
import ConfigInterface from '@src/interfaces/ConfigInterface'
import Config from '@src/types/Config'
import configIsObject from '@src/helpers/configIsObject'
import resolveThemeRoot from '@src/resolveThemeRoot'

const output = {
    assetFileNames: (assetInfo: EmittedAsset): string => {
        let ext = assetInfo.name.split('.').at(1)

        /**
         * Images
         */
        if (/png|jpe?g|gif|tiff|bmp|ico/i.test(ext)) {
            ext = 'images'
        }

        /**
         * SVG icons
         */
        if (/svg/i.test(ext)) {
            ext = 'icons'
        }

        /**
         * Other types
         */
        return `${ext}/[name].[hash][extname]`
    },
    chunkFileNames: 'js/chunks/[name].[hash].js',
    entryFileNames: 'js/[name].[hash].js',

} as OutputOptions

/**
 * Resolve output directory name
 * @default `dist`
 */
const resolveOutDir = (config: Config): string => {
    const themeRoot = resolveThemeRoot(config)
    const defaultOutDir = `${themeRoot}/dist`

    if (configIsObject(config)) {
        return (config as ConfigInterface)?.outDir ?
            `${themeRoot}/${(config as ConfigInterface).outDir}` :
            defaultOutDir
    }

    return defaultOutDir
}

export {resolveOutDir}
export default output
