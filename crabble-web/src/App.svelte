<script lang="ts">
  import GameInfo from "./lib/GameInfo.svelte";
  import GameOver from "./lib/GameOver.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";
  import Shuffler from "./lib/Shuffler.svelte";
</script>

<main>
    <ModeSelector></ModeSelector>
    <GameInfo></GameInfo>
    <Shuffler></Shuffler>
</main>

<GameOver />

<style>
  :global(body) {
    font-family: var(--c-font-primary);
    font-feature-settings: 'liga' 1, 'calt' 1;
  }
  main {
    display: flex;
    flex-direction: column;

    width: clamp(50dvw, 500px, 80dvw);
    margin: auto;
  }
</style>
