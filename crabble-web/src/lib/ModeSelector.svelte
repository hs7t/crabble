<script>
    import Dialog from "./components/Dialog.svelte";
    import Picker from "./components/Picker.svelte";

    let { shown = $bindable(true) } = $props()
</script>

<Dialog bind:shown={shown}>
    {#snippet content()}
        <Picker 
            radioName="gameModeRadioSelector"
            options={[
                {
                    value: "spooky",
                    label: "Spooky"
                },
                {
                    value: "infinite",
                    label: "Infinite"
                },
                {
                    value: "lightning",
                    label: "Lightning"
                }
            ]}
        ></Picker>
    {/snippet}
</Dialog>

<style>
</style>