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
  <ol class="dot-container" bind:this={container}>
    {#each dots as dot}
      <li>
        <button
          class="dot"
          class:active={dot == activeDot}
          aria-current={dot === activeDot}
          aria-label={getDotLabel(dot, dot === activeDot)}
          on:click={() => setActive(dot)}
        />
      </li>
    {/each}

    <span aria-hidden="true" class="active-dot" />
  </ol>
</nav>

<style lang="scss">
  .leo-navdots {
    --transition-duration: var(--leo-navdots-transition-duration, 0.2s);
    --transition-easing: var(--leo-navdots-transition-easing, ease-in-out);

    --size: var(--leo-navdots-size, 8px);
    --spacing: var(--leo-navdots-spacing, 10px);
    --vertical-margin: var(--leo-navdots-vertical-margin, 1px);

    // By default, expanded dot grows to fill half spacing in each direction.
    --expanded-width: var(--leo-navdots-expanded-width, calc(var(--leo-navdots-size) + var(--leo-navdots-spacing)));

    --color: var(--leo-navdots-color, var(--color-primary-20));
    --color-hover: var(--leo-navdots-color-hover, var(--color-primary-30));

    --active-color: var(--leo-navdots-active-color, var(--color-interaction-button-primary-background));
    --active-color-hover: var(--leo-navdots-active-color-hover, var(--color-icon-interactive));
    
    --focus-outline-color: var(--leo-navdots-focus-outline-color, #423eee);

    --current-dot: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;

    .dot-container {
      display: flex;
      flex-direction: row;
      gap: var(--spacing);
      position: relative;
      padding: 0 calc(var(--spacing) / 2);
      margin: 0;
      list-style: none;

      > li {
        display: flex;
      }

      &:has(.dot.active:focus-visible) .active-dot {
        box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.5),
          0px 0px 4px 2px var(--focus-outline-color);
      }
    }

    .dot {
      all: unset;
      cursor: pointer;
      margin: var(--vertical-margin) 0;
      width: var(--size);
      height: var(--size);
      border-radius: var(--size);
      background: var(--color);
      transition: background-color var(--transition-duration)
          var(--transition-easing),
        box-shadow var(--transition-duration) var(--transition-easing);

      &:hover {
        background-color: var(--color-hover);
      }

      &:focus-visible:not(.active) {
        box-shadow: 0px 0px 0px 1.5px rgba(255, 255, 255, 0.5),
          0px 0px 4px 2px var(--focus-outline-color);
      }
    }

    .active-dot {
      cursor: pointer;
      position: absolute;
      transition: transform var(--transition-duration) var(--transition-easing),
        box-shadow var(--transition-duration) var(--transition-easing);
      transform: translate(
        calc(
          (var(--size) + var(--spacing)) * var(--current-dot) -
            var(--spacing) / 2
        ),
        0
      );
      width: calc(var(--size) + var(--spacing));
      height: calc(var(--size) + var(--vertical-margin) * 2);
      border-radius: var(--size);
      background: var(--active-color);

      &:hover {
        background: var(--active-color-hover);
      }
    }
  }
</style>
