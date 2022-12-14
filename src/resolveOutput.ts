import { EmittedAsset, OutputOptions } from 'rollup'

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

export default output
