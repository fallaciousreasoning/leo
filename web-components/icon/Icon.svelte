<svelte:options tag="leo-icon" />

<script context="module" lang="ts">
  import './library.default'
  const parser = new DOMParser()

  const iconRequests = new Map<
    string,
    Promise<{ ok: boolean; svg: string | null }>
  >()
  const fetchIcon = async (library: IconLibrary, name: string) => {
    const url = library.resolve(name)
    const response = await fetch(url)
    if (!response.ok) return { ok: false, svg: null }

    const parsed = parser.parseFromString(await response.text(), 'text/html')
    const svgRoot = parsed.querySelector('svg')
    if (!svgRoot) return { ok: true, svg: '' }

    // If the library has a mutate function, run it.
    library.mutate?.(svgRoot, name)

    return {
      ok: true,
      svg: svgRoot.outerHTML,
    }
  }

  const requestIcon = (library: IconLibrary, name: string) => {
    const key = `${library.name}|${name}`
    if (!iconRequests.has(key)) {
      const request = fetchIcon(library, name)
      iconRequests.set(key, request)
    }
    return iconRequests.get(key)
  }
</script>

<script lang="ts">
  import type { IconLibrary } from './iconLibrary';
  import { getLibrary } from './iconLibrary'

  export let name: string
  export let library: string = 'default'

  $: iconLibrary = getLibrary(library)
  $: iconPromise = !$$slots.default && requestIcon(iconLibrary, name)
</script>

<div class="leoIcon" part="container">
  <slot>
    {#await iconPromise then result}
      {#if result.svg}
        {@html result.svg}
      {/if}
    {/await}
  </slot>
</div>

<style lang="scss">
  .leoIcon {
    --icon-width: var(--leo-icon-size, 24px);
    --icon-height: var(--leo-icon-size, 24px);

    width: var(--icon-width);
    height: var(--icon-height);
    color: var(--leo-icon-color, inherit);

    :global(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>
