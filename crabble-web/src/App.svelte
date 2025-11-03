<script lang="ts">
  import GameOver from "./lib/GameOver.svelte";
  import Shuffler from "./lib/Shuffler.svelte";

  import { gameState, getOverStatus } from "./shared.svelte";
  let currentGameStatus = $derived(getOverStatus(gameState))
</script>

<main>
    <Shuffler></Shuffler>
</main>

{#if currentGameStatus == 'won' || 'lost'}
  <GameOver status={currentGameStatus} />
{/if}

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
