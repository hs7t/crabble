<script lang="ts">
  import ProgressBar from "./lib/components/ProgressBar.svelte";
  import GameOver from "./lib/GameOver.svelte";
  import Shuffler from "./lib/Shuffler.svelte";

  import { gameState, getOverStatus, PUZZLE_TIME_QUANTITY } from "./shared.svelte";
  let currentGameStatus = $derived(getOverStatus(gameState))
</script>

<main>
    <ProgressBar currentValue={gameState.timeLeft} maxValue={gameState.maxTime}></ProgressBar>
    {gameState.timeLeft}
    <Shuffler></Shuffler>
</main>

<GameOver status={currentGameStatus} />

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
