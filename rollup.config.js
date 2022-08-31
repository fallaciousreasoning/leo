import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs'
import path from 'path'
import emitDts from 'rollup-plugin-svelte-types';
console.log('emit', emitDts())
import generateReactBinding from './generateReactBinding';

const webComponents = fs.readdirSync('./web-components')
    .map(c => [`./web-components/${c}/${c}.svelte`])
    .filter(([c]) => fs.existsSync(c))
    .flatMap(c => c);

export default [{
    external: ['react', 'react-dom'],
    input: [...webComponents, './web-components/svelte-react.ts'],
    output: {
        dir: 'build/web-components',
        // The destination for our bundled JavaScript
        entryFileNames: (file) => {
            const name = file.name
            if (name === 'svelte-react') return '[name].js'

            const directory = path.basename(path.resolve(file.facadeModuleId, '..'));
            return `${directory}/[name].js`
        },
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        generateReactBinding({
            sources: webComponents
        }),
        emitDts({ declarationDir: './build/web-components' }),
        svelte({
            compilerOptions: {
                customElement: true
            },
            preprocess: sveltePreprocess(),
            // Tell the svelte plugin where our svelte files are located
            include: 'web-components/**/*.svelte',
        }),
        // Tell any third-party plugins that we're building for the browser
        resolve({ browser: true }),
        commonjs({
            exclude: ['react', 'react-dom'],
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM'
            }
        }),
        typescript(),
    ],
}, ];
