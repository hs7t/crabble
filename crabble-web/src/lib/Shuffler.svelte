<script lang="ts">
    import { onMount } from "svelte";
    import { gameState } from "../shared.svelte";
    import WordBlock from "./components/WordBlock.svelte";
    import { dndzone } from 'svelte-dnd-action'

    let element: HTMLElement|undefined = undefined;

    onMount(() => {
        document.addEventListener('keyup', (event: any) => {
            let isFocusedInside = element?.contains(document.activeElement)
            if (!isFocusedInside) {
                if (event.code == "KeyQ") {
                    const firstChild = element?.querySelector('.wordContainer') as HTMLElement
                    firstChild?.focus()
                }
                if (event.code == "KeyW") {
                    const children = element?.querySelectorAll('.wordContainer')
                    const lastChild = children?.[children.length - 1] as HTMLElement
                    lastChild?.focus()
                }
            }
        })

        element?.addEventListener('keyup', (event) => {
            if (event.code == "KeyW") {
                ((event.target as HTMLElement)?.nextElementSibling as HTMLElement)?.focus()
            }
            if (event.code == "KeyQ") {
                ((event.target as HTMLElement)?.previousElementSibling as HTMLElement)?.focus()
            }
        })
    })

	function handleSort(e: any) {
		gameState.currentSolution = e.detail.items;
	}
</script>

<div 
    use:dndzone="{{items: gameState.currentSolution}}" 
    on:consider={handleSort} 
    on:finalize={handleSort} 
    class="main-container" 
    bind:this={element}
>
    {#each gameState.currentSolution as word(word.id)}
        <span class="wordContainer">
            <WordBlock 
                word={word.title} 
            />
        </span>
    {/each}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        gap: 1ch;
        padding: 1ch;

        overflow-x: auto;
        border: var(--c-border-general);
        border-radius: 8pt;

        transition: all 100ms;
    }
</style>