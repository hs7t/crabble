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

<section>
    <h1>crabble!</h1>
    <div class="progress">
        <ProgressBar currentValue={timeLeft} maxValue={maxTime}></ProgressBar>
        <span class="time-indicator">{timeLeft}</span>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 0.6rem;
    }

    .time-indicator {
        user-select: none;
        font-weight: 500;
    }

    section h1 {
        color: var(--c-color-accent-A);
        user-select: none;
    }

    .progress {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.8rem;
    }
</style>