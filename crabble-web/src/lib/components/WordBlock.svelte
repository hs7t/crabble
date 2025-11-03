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
        --background-color: var(--c-color-accent-A);
        --color: var(--c-color-accent-A-contrast);

        padding: 1ch;

        border-radius: 8pt;
        background-color: var(--background-color);
        color: var(--color);
        font-weight: 600;
    }
</style>