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
            {#if gameState.gameType == "lightning"}
                <p><b>In Lightning mode</b>, you'll solve a set of three puzzles.</p>
            {:else if gameState.gameType == "infinite"}
                <p><b>In Infinite mode</b>, you can solve as many puzzles as you want.</p>
            {:else if gameState.gameType == "spooky"}
                <p>
                    <b>Spooky mode</b> is Lightning mode, but spookier! Solve
                    a set of three spooky-scary puzzles.
                </p>

            {/if}

        </section>
        <section>
            <details>
                <summary>How to play</summary>
                <ul>
                    <li>Complete a puzzle by putting each series of words in the correct order.</li>
                    <li>Use <code>Q</code> or <code>W</code> to select blocks.</li>
                    <li>Use <code>Space</code> to pick up a word. Then, use your arrow keys to move it.</li>
                    <li>Hit <code>Space</code> again to set down the word.</li>
                    <li>Not using a keyboard? Don't worry. Drag any word to set it in the right place.</li>
                </ul>
            </details>
        </section>
    {/snippet}
    {#snippet actions()}
        <Button action={handleGameStart} content="Start!"></Button>
    {/snippet}
</Dialog>

<style>
</style>