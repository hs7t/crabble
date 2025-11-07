<script lang="ts">
  import GameInfo from "./lib/GameInfo.svelte";
  import GameOver from "./lib/GameOver.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";
  import Shuffler from "./lib/Shuffler.svelte";
  import { gameState } from "./shared.svelte";
</script>

<main>
    <ModeSelector></ModeSelector>
    {#if gameState.puzzle}
      <GameInfo></GameInfo>
      <Shuffler></Shuffler>
    {/if}
</main>

<GameOver />

<style>
  :global(body) {
    font-family: var(--c-font-primary);
    font-feature-settings: 'liga' 1, 'calt' 1;
  }

  :global(h1, h2, h3, h4, h5, p) {
    margin: 0;
    padding: 0;
  }
  main {
    display: flex;
    flex-direction: column;

    width: clamp(50dvw, 500px, 80dvw);
    margin: auto;
  }
</style>
