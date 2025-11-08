<script lang="ts">
    import { appEvents, gameState, getOverStatus, RestartGameEvent } from "../shared.svelte";
    import Button from "./components/Button.svelte";
    import Dialog from "./components/Dialog.svelte";
    let status = $derived.by(() => getOverStatus(gameState))
     
    let shown = $derived(status === 'lost' || status === 'won')

    let info = {
        get dialogTitle () {
            switch (getOverStatus(gameState)) {
                case "playing":
                    return "Time!"
                case "lost":
                    return "Time!"
                case "won":
                    return "Woah!"
            }
        },
        stats: {
            get timePlayed() {
                return (gameState.playTime / 1000)
            },
            get puzzlesPlayed() {
                return gameState.puzzleRuns
            },
            get playingMode() {
                switch (gameState.gameType) {
                    case "lightning":
                        return "Lightning"
                    case "infinite":
                        return "Infinite"
                    case "spooky":
                        return "Spooky"
                }
            }
        }
    }
</script>

<Dialog {shown} dismissable={false} title={info.dialogTitle}>
    {#snippet content()}
        {#if status == 'lost'}
            <p>Awh, you lost! That's okay.</p>
        {/if}
        {#if status == 'won'}
            <p>You won! That's awesome.</p>
        {/if}
        {#if status == 'playing'}
            <p>
                (」°ﾛ°)｣ You shouldn't be able to get this - please 
                <a href="mailto:hi@hvii.cc">email me!</a>
            </p>
        {/if}
        <p>
            You played on {info.stats.playingMode} mode for about {info.stats.timePlayed}
            {(info.stats.timePlayed == 1) ? "second" : "seconds"}.
        </p>
    {/snippet}
    {#snippet actions()}
        <Button primary action={() => appEvents.dispatchEvent(RestartGameEvent)} content="Play again"/>
    {/snippet}
</Dialog>