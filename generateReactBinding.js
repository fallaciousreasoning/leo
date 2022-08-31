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
                console.log(componentName, importName)
                const cacheFolder = getCacheFile(source, options)
                await fs.mkdir(cacheFolder, { recursive: true })

                const content =`
import SvelteToReact from '${path.relative(cacheFolder, options.reactWrapperPath)}'; 
import ${importName} from '${path.relative(cacheFolder, source)}'
export default SvelteToReact('leo-${componentName.toLowerCase()}', ${importName})`
console.log(content)
                await fs.writeFile(`${cacheFolder}/react.ts`, content)

                this.emitFile({
                    type: 'chunk',
                    fileName: `${componentName}/react.js`,
                    id: `${cacheFolder}/react.ts`
                })
            }
        },
    }
}

export default generateReactBinding
