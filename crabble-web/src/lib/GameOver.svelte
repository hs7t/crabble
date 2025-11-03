<script lang="ts">
    import type { gameStatus } from "../shared.svelte";
    import Dialog from "./components/Dialog.svelte";
    let { status = undefined as gameStatus|undefined } = $props()
</script>

<Dialog>
    {#snippet content()}
        {#if status == 'lost'}
            You lost :P
        {/if}
    {/snippet}
</Dialog>