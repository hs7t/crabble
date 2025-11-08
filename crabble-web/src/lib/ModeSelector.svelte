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
        <section>
            <h3>Pick a mode</h3>
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
        </section>
        <section>
            <h3>How to play</h3>
            <ul>
                {#if gameState.gameType == "lightning"}
                    <li><b>In Lightning mode</b>, you'll solve a set of three puzzles.</li>
                {:else if gameState.gameType == "infinite"}
                    <li><b>In Infinite mode</b>, you can solve as many puzzles as you want.</li>
                {:else if gameState.gameType == "spooky"}
                    <li>
                        <b>Spooky mode</b> is Lightning mode, but spookier! In it, you'll solve
                        a set of three spooky-scary puzzles.
                    </li>

                {/if}
                <li>Complete a puzzle by putting each series of words in the correct order.</li>
                <li>Use <code>Q</code> or <code>W</code> to select blocks.</li>
                <li>Use <code>Space</code> to pick up a word. Then, use your arrow keys to move it.</li>
                <li>Hit <code>Space</code> again to set down the word.</li>
                <li>Not using a keyboard? Don't worry. Drag any word to set it in the right place.</li>
            </ul>
        </section>
        <Button action={handleGameStart} content="Start!"></Button>
    {/snippet}
</Dialog>

<style>
</style>