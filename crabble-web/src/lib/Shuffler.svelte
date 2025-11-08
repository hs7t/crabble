<script lang="ts">
    import { onMount } from "svelte";
    import { appEvents, checkSeriesSolutionValidity, gameState, SeriesCompleteEvent, type Milliseconds } from "../shared.svelte";
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

    let wordColors = new Map<number, string>();

    const getRandomAccentColorVariable = () => {
        const accentColorVariables = [
            "--c-color-accent-A",
            "--c-color-accent-B",
            "--c-color-accent-C",
            "--c-color-accent-D",
        ]

        return accentColorVariables[
            Math.floor(Math.random() * accentColorVariables.length)
        ]
    }

    const getColorForWord = (wordId: number) => {
        if (!wordColors.has(wordId)) {
            wordColors.set(wordId, getRandomAccentColorVariable());
        }
        return wordColors.get(wordId)!;
    }
    
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

    const flipDuration = 200 as Milliseconds
</script>

<div 
    use:dndzone="{{items: currentSeries, flipDurationMs: flipDuration}}" 
    onconsider={handleConsider} 
    onfinalize={handleSort} 
    class="main-container" 
    bind:this={element}
>
    {#each currentSeries as word(word.id)}
        {@const colorVar = getColorForWord(word.id)}
        <span class="wordContainer" animate:flip={{duration: flipDuration}}>
            <WordBlock 
                word={word.title} 
                style="
                    --background-color: var({colorVar}) !important;
                    --color: var({colorVar}-contrast) !important;
                "
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
    }

    .wordContainer:focus, .wordContainer:active {
        outline: var(--c-border-attention);
        outline-offset: 3pt;
    }
</style>