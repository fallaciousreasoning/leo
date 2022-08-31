import path from 'path'
import fs from 'fs/promises'

const defaultOptions = {
    cacheFolder: '.cache',
    reactWrapperPath: './web-components/svelte-react',
    sources: [],
    getComponentName: (source) => `${path.basename(path.resolve(source, '..'))}`
}

const getCacheFile = (source, options) => {
    const relativePath = path.relative('.', path.resolve(source, '..'));
    const cachePath = path.join(options.cacheFolder, relativePath);
    return cachePath
}

const generateReactBinding = (options = defaultOptions) => {
    options = { ...defaultOptions, ...options }
    return {
        name: 'generateReactBinding',
        async buildStart() {
            console.log(options.sources)
            for (const source of options.sources) {
                const componentName = options.getComponentName(source);
                const importName = componentName[0].toUpperCase() + componentName.substring(1);
                const cacheFolder = getCacheFile(source, options)
                await fs.mkdir(cacheFolder, { recursive: true })

                await fs.writeFile(`${cacheFolder}/react.ts`, `
import SvelteToReact from '${path.relative(cacheFolder, options.reactWrapperPath)}'; 
import ${importName} from '${path.relative(cacheFolder, source)}'
export default SvelteToReact('leo-${componentName.toLowerCase()}', ${importName})`)

                this.emitFile({
                    type: 'chunk',
                    fileName: `${componentName}/react.ts`,
                    id: `${cacheFolder}/react.ts`
                })
            }
        },
        generateBundle() {
            // for (const source of options.sources) {
            //     this.emitFile({
            //         type: 'chunk',
            //         id: getCacheFile(source, options)
            //     })
            // }
        },
    }
}

export default generateReactBinding
