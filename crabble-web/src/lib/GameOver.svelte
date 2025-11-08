<script lang="ts">
    import { gameState, getOverStatus } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let status = $derived.by(() => getOverStatus(gameState))
     
    let shown = $derived(status === 'lost' || status === 'won')
    let dialogTitle = $derived.by(() => {
        switch (getOverStatus(gameState)) {
            case "playing":
                return "Time!"
            case "lost":
                return "Time!"
            case "won":
                return "Woah!"
        }
    })
</script>

<Dialog {shown} dismissable={false} title={dialogTitle}>
    {#snippet content()}
        {#if status == 'lost'}
            <p>Awh, you lost! That's okay.</p>
        {/if}
        {#if status == 'won'}
            Yay! You won!
        {/if}
        {#if status == 'playing'}
            (」°ﾛ°)｣ You shouldn't be able to get this - please <a href="mailto:hi@hvii.cc">email me!</a>
        {/if}
    {/snippet}
</Dialog>