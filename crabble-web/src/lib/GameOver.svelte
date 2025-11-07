<script lang="ts">
    import { gameState, getOverStatus } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let status = $derived.by(() => getOverStatus(gameState))
     
    let shown = $derived(status === 'lost' || status === 'won')
</script>

<Dialog {shown} dismissable={false} title="Woah!">
    {#snippet content()}
        {#if status == 'lost'}
            You lost :P
        {/if}
        {#if status == 'won'}
            Yay! You won!
        {/if}
        {#if status == 'playing'}
            (」°ﾛ°)｣ You shouldn't be able to get this - please <a href="mailto:hi@hvii.cc">email me!</a>
        {/if}
    {/snippet}
</Dialog>