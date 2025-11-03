<script lang="ts">
    import { onMount } from "svelte";
    import { appEvents, gameState } from "../shared.svelte";
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

	function handleSort(e: any) {
		gameState.currentSolution = e.detail.items;
	}
</script>

<div use:dndzone="{{items: gameState.currentSolution}}" on:consider={handleSort} on:finalize={handleSort} class="main-container" bind:this={element}>
    {#each gameState.currentSolution as word(word.id)} 
        <WordBlock 
            word={word.title} 
        />
    {/each}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 1ch;
        padding: 1ch;

        overflow-y: scroll;
        border: var(--c-border-general);
        border-radius: 8pt;
    }
</style>