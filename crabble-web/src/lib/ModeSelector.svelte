<script>
    import Dialog from "./components/Dialog.svelte";
    import Picker from "./components/Picker.svelte";

    let { shown = $bindable(true) } = $props()
</script>

<Dialog bind:shown={shown}>
    {#snippet content()}
        <Picker></Picker>
    {/snippet}
</Dialog>

<style>
</style>