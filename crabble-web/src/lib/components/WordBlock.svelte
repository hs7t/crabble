<script lang="ts">
  import { onMount } from "svelte";

    let { word, onActivate = undefined, element = $bindable(undefined) } = $props()

    onMount(() => {
        element.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key == "Enter" && onActivate != undefined) {
                onActivate()
            }
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