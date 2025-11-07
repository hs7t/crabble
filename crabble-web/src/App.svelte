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
      <span class="first layout-group">
        <GameInfo></GameInfo>
      </span>
      <span class="second layout-group">
        <Shuffler></Shuffler>
      </span>
    {/if}
</main>

<GameOver />

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    font-family: var(--c-font-primary);
    font-feature-settings: 'liga' 1, 'calt' 1;
  }

  :global(h1, h2, h3, h4, h5, p) {
    margin: 0;
    padding: 0;
  }

  :global(#app, body) {
    height: 100dvh;
    padding: 0;
    margin: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-items: center;
    height: 100%;
    gap: 1.4rem;
    padding-top: 10%;

    width: clamp(50dvw, 500px, 80dvw);
    margin: auto;
  }

  .second.layout-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
  }
</style>
