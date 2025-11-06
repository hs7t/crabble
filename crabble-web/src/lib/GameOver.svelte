<script lang="ts">
    import { gameState } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let status = gameState.gameStatus
     
    let shown = $derived(status === 'lost' || status === 'won')
</script>

<Dialog {shown} dismissable={false}>
    {#snippet content()}
        {#if status == 'lost'}
            You lost :P
        {/if}
        {#if status == 'won'}
            Yay! You won!
        {/if}
        {#if status == 'playing'}
            How'd you get this?!
        {/if}
    {/snippet}
</Dialog>