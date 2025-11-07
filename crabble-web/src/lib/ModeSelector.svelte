<script>
    import { appEvents, GameStartEvent, gameState } from "../shared.svelte";
    import Button from "./components/Button.svelte";
    import Dialog from "./components/Dialog.svelte";
    import Picker from "./components/Picker.svelte";

    let { shown = $bindable(true) } = $props()

    const handleGameStart = async () => {
        appEvents.dispatchEvent(GameStartEvent)
        shown = false;
    }
</script>

<Dialog bind:shown={shown} dismissable={false} title="crabble!">
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
            bind:selectedValue={gameState.gameType}
        ></Picker>
        <Button action={handleGameStart} content="Start!"></Button>
    {/snippet}
</Dialog>

<style>
</style>