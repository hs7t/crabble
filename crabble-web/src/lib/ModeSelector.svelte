<script>
    import Dialog from "./components/Dialog.svelte";
    import Picker from "./components/Picker.svelte";

    let { shown = $bindable(true) } = $props()
</script>

<Dialog bind:shown={shown} dismissable={false}>
    {#snippet content()}
        <Picker 
            radioName="gameModeRadioSelector"
            options={[
                {
                    value: "infinite",
                    label: "Infinite"
                },
                {
                    value: "lightning",
                    label: "Lightning"
                },
                {
                    value: "spooky",
                    label: "Spooky"
                },
            ]}
        ></Picker>
    {/snippet}
</Dialog>

<style>
</style>