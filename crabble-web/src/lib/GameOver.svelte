<script lang="ts">
    import type { gameStatus } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let { status = undefined as gameStatus|undefined} = $props()
    let shown = $derived(status === 'lost' || status === 'won')
</script>

<Dialog {shown}>
    {#snippet content()}
        {#if status == 'lost'}
            You lost :P
        {/if}
    {/snippet}
</Dialog>