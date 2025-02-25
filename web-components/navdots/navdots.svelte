<svelte:options tag="leo-navdots" />

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let dotCount: number
  export let activeDot: number
  export let getDotLabel: (dot: number, isCurrent: boolean) => string = (dot) =>
    `Page ${dot + 1}`
  export let label: string = 'Pagination'

  let container: HTMLElement
  $: container?.setAttribute('style', `--current-dot: ${activeDot}`)
  $: dots = Array.from(Array(dotCount), (_, i) => i)

  let dispatch = createEventDispatcher<{
    change: { activeDot: number }
  }>()

  function setActive(dot: number) {
    dispatch('change', { activeDot: dot })
  }
</script>

<nav class="leo-navdots" aria-label={label}>
  <ol class="dot-container" part="dot-container" bind:this={container}>
    {#each dots as dot}
      <li>
        <button
          class="dot"
          class:active={dot == activeDot}
          part="dot"
          aria-current={dot === activeDot}
          aria-label={getDotLabel(dot, dot === activeDot)}
          on:click={() => setActive(dot)}
        />
      </li>
    {/each}

    <li aria-hidden="true" class="active-dot" part="active-dot" />
  </ol>
</nav>

<style lang="scss">
  :root {
    --dot-size: 8px;
    --dot-spacing: 10px;
    --dot-vertical-margin: 1px;
    --current-dot: 0;
    --transition-duration: 0.2s;
    --transition-easing: ease-in-out;

    // Expanded dot grows to fill half spacing in each direction.
    --expanded-dot-size: calc(var(--dot-size) + var(--dot-spacing));

    width: 100%;
  }

  .leo-navdots {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .dot-container {
      display: flex;
      flex-direction: row;
      gap: var(--dot-spacing);
      position: relative;
      padding: 0 calc(var(--dot-spacing) / 2);
      margin: 0;
      list-style: none;

      > li {
        display: flex;
      }

      &:has(.dot.active:focus-visible) .active-dot {
        box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.5),
          0px 0px 4px 2px #423eee;
      }
    }

    .dot {
      all: unset;
      cursor: pointer;
      margin: var(--dot-vertical-margin) 0;
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--dot-size);
      background: var(--color-primary-20);
      transition: background-color var(--transition-duration)
          var(--transition-easing),
        box-shadow var(--transition-duration) var(--transition-easing);

      &:hover {
        background-color: var(--color-primary-30);
      }

      &:focus-visible:not(.active) {
        box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.5),
          0px 0px 4px 2px #423eee;
      }
    }

    .active-dot {
      cursor: pointer;
      position: absolute;
      transition: transform var(--transition-duration) var(--transition-easing),
        box-shadow var(--transition-duration) var(--transition-easing);
      transform: translate(
        calc(
          (var(--dot-size) + var(--dot-spacing)) * var(--current-dot) -
            var(--dot-spacing) / 2
        ),
        0
      );
      width: calc(var(--dot-size) + var(--dot-spacing));
      height: calc(var(--dot-size) + var(--dot-vertical-margin) * 2);
      border-radius: var(--dot-size);
      background: var(--color-interaction-button-primary-background);

      &:hover {
        background: var(--color-icon-interactive);
      }
    }
  }
</style>
