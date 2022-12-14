import EntryInterface from './EntryInterface'

export default interface ConfigInterface {

    /**
     * User input
     * @see https://rollupjs.org/guide/en/#input
     */
    input: string | string[] | EntryInterface

    /**
     * Theme root path
     * @default `web/app/themes/wolat`
     */
    theme?: string

    /**
     * Manifest file name
     * @default true
     */
    manifest?: string | true

    /**
     * Output directory
     * @default `dist`
     */
    outDir?: string
}
