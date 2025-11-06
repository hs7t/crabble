<script lang="ts">
    import { onMount } from "svelte";
    import { appEvents, checkSeriesSolutionValidity, gameState, SeriesCompleteEvent } from "../shared.svelte";
    import WordBlock from "./components/WordBlock.svelte";
    import { dndzone } from 'svelte-dnd-action'
    import { flip } from "svelte/animate";

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

    let currentSeries = $derived.by(() => 
        {
            if (gameState?.puzzleState) {
                return gameState.puzzleState.currentSolution[gameState.puzzleState.currentSeriesIndex]
            }
            return []
        }
    )
    
    function handleConsider(e: any) {
        if (gameState?.puzzleState && gameState?.puzzle) {
            gameState.puzzleState.currentSolution[gameState.puzzleState.currentSeriesIndex] = e.detail.items;
        }
    }

	function handleSort(e: any) {
        if (gameState?.puzzleState && gameState?.puzzle) {
            gameState.puzzleState.currentSolution[gameState.puzzleState.currentSeriesIndex] = e.detail.items;
            gameState.puzzleState.timeLeft = gameState.puzzleState.maxTime;

            if (checkSeriesSolutionValidity(
                gameState.puzzleState.currentSolution[gameState.puzzleState.currentSeriesIndex],
                gameState.puzzle.series[gameState.puzzleState.currentSeriesIndex]
            )) {
                appEvents.dispatchEvent(SeriesCompleteEvent)
            }
        }
	}
</script>

<div 
    use:dndzone="{{items: currentSeries}}" 
    onconsider={handleConsider} 
    onfinalize={handleSort} 
    class="main-container" 
    bind:this={element}
>
    {#each currentSeries as word(word.id)}
        <span class="wordContainer" animate:flip={{duration: 100}}>
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
        flex-grow: 1;
        justify-content: flex-start;
        gap: 1ch;
        padding: 1ch;

        overflow-x: auto;
        border: var(--c-border-general);
        border-radius: 8pt;

        transition: all 100ms;
    }

    .wordContainer:focus, .wordContainer:active {
        outline: var(--c-border-attention);
        outline-offset: 3pt;
    }
</style>