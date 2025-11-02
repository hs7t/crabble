<script lang="ts">
    import { onMount } from "svelte";
    import { appEvents, swap } from "../shared.svelte";
    import WordBlock from "./components/WordBlock.svelte";
    import { dndzone } from 'svelte-dnd-action'

    let element: HTMLElement|undefined = undefined;

    onMount(() => {
        appEvents.addEventListener('wordBlockKeyUp', (event: any) => {
            if (event.detail.receivedEvent.key == "ArrowRight") {
                ((event.detail.receivedEvent.target as HTMLElement)?.nextElementSibling as HTMLElement)?.focus()
            }
            if (event.detail.receivedEvent.key == "ArrowLeft") {
                ((event.detail.receivedEvent.target as HTMLElement)?.previousElementSibling as HTMLElement)?.focus()
            }
        }, true)
    })

    type Word = {
        id: number
        title: string
    }

    let words: Array<Word> = [{id: 1, title: "meow"}, {id: 2, title: "woo"}, {id: 3, title: "hoo"}]

	function handleSort(e: any) {
		words = e.detail.items;
	}

    function handleBlockInteract(word: Word) {
        let indexInArray = words.findIndex(w => w.id === word.id)
        words = swap(words, indexInArray, ((indexInArray + 1) % words.length))
    }
</script>

<div use:dndzone="{{items: words}}" on:consider={handleSort} on:finalize={handleSort} class="main-container" bind:this={element}>
    {#each words as word(word.id)} 
    <WordBlock 
        word={word.title} 
        onActivate={() => {
            handleBlockInteract(word)
        }}
    />
    {/each}
</div>

<style>
    .main-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1ch;
        overflow-y: scroll;
    }
</style>