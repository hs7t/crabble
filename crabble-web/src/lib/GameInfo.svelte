<script>
    import ProgressBar from "./components/ProgressBar.svelte";
    import { gameState } from "../shared.svelte";

    let timeLeft = $derived.by(() => {
        let value = 0
        if (gameState?.puzzleState) {
            value = gameState.puzzleState.timeLeft
        }
        return value
    })
    let maxTime = $derived.by(() => {
        let value = 0
        if (gameState?.puzzleState) {
            value = gameState.puzzleState.maxTime
        }
        return value
    })
</script>

<ProgressBar currentValue={timeLeft} maxValue={maxTime}></ProgressBar>
{timeLeft}
