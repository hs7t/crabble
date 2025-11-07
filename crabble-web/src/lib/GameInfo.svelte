<script>
    import ProgressBar from "./components/ProgressBar.svelte";
    import { gameState } from "../shared.svelte";

    let timeLeft = $derived.by(() => {
        let value = 0
        if (gameState?.puzzleState) {
            value = (gameState.puzzleState.timeLeft / 1000)
        }
        return value
    })
    let maxTime = $derived.by(() => {
        let value = 0
        if (gameState?.puzzleState) {
            value = (gameState.puzzleState.maxTime / 1000)
        }
        return value
    })
</script>

<div class="progress">
    <ProgressBar currentValue={timeLeft} maxValue={maxTime}></ProgressBar>
    {timeLeft}
</div>

<style>
    .progress {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.8rem;
    }
</style>