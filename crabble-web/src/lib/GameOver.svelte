<script lang="ts">
    import { gameState } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let status = gameState.gameStatus
     
    let shown = $derived(status === 'lost' || status === 'won')
</script>

<Dialog {shown}>
    {#snippet content()}
        {#if status == 'lost'}
            You lost :P
        {/if}
    {/snippet}
</Dialog>