<script lang="ts">
    import { onMount } from "svelte";
    import { swap, appEvents } from "../shared.svelte";
    import type { Word } from "../shared.svelte";
    import WordBlock from "./components/WordBlock.svelte";
    import { dndzone } from 'svelte-dnd-action'

    let element: HTMLElement|undefined = undefined;

    onMount(() => {
        document.addEventListener('keyup', (event: any) => {
            let isFocusedInside = element?.contains(document.activeElement)
            if (!isFocusedInside) {
                if (event.code == "KeyQ") {
                    const firstChild = element?.querySelector('.word') as HTMLElement
                    firstChild?.focus()
                }
                if (event.code == "KeyW") {
                    const children = element?.querySelectorAll('.word')
                    const lastChild = children?.[children.length - 1] as HTMLElement
                    lastChild?.focus()
                }
            }
        })

        appEvents.addEventListener('wordBlockKeyUp', (event: any) => {
            if (event.detail.receivedEvent.code == "KeyW") {
                ((event.detail.receivedEvent.target as HTMLElement)?.nextElementSibling as HTMLElement)?.focus()
            }
            if (event.detail.receivedEvent.code == "KeyQ") {
                ((event.detail.receivedEvent.target as HTMLElement)?.previousElementSibling as HTMLElement)?.focus()
            }
        }, true)
    })

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