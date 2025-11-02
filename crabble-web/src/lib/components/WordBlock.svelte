<script lang="ts">
    import { onMount } from "svelte";
    import { appEvents } from "../../shared.svelte";

    let { word, element = $bindable(undefined) } = $props()

    onMount(() => {
        element.addEventListener("keyup", (event: KeyboardEvent) => {
            if (event.code == "KeyQ" || event.code == "KeyW" || event.code == "Enter") {
                event.preventDefault()
            }
            appEvents.dispatchEvent(
                new CustomEvent("wordBlockKeyUp", {
                    detail: {
                        receivedEvent: event,
                        word: word,
                    }
                })
            )
        })
    })
</script>

<div class="word" bind:this={element}>
    {word}
</div>

<style>
    .word {
        padding: 1ch;
    }
</style>