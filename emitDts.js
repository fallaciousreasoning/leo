const svelte2tsx = require("svelte2tsx")

svelte2tsx.emitDts({
  libRoot: './',
  // !important, otherwise it doesn't generate types.
  svelteShimsPath: require.resolve("svelte2tsx/svelte-shims.d.ts"),
  declarationDir: "./build/web-components/",
})

const emitDts = (options = { libRoot: './', declarationDir: './types' }) => {
    return {
        name: 'emitDts',
        buildStart: async () => {
            await svelte2tsx.emitDts({
                libRoot: options.libRoot,
                svelteShimsPath: require.resolve('svelte2tsx/svelte-shims.d.ts'),
                declarationDir: options.declarationDir
            })
        }
    }
}

export default emitDts
