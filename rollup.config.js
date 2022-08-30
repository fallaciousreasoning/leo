import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs'
import svelteDts from 'svelte-dts';

const webComponents = fs.readdirSync('./web-components').map(c => `./web-components/${c}/${c}.svelte`).filter(c => fs.existsSync(c));

export default {
    input: [...webComponents],
    output: {
        dir: 'build/web-components',
        // The destination for our bundled JavaScript
        entryFileNames: '[name]/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        svelteDts({
            output: 'build/web-components/index.d.ts'
        }),
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
        commonjs(),
        typescript(),
    ],
};
