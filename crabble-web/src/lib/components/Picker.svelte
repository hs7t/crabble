<script lang="ts">
    let { radioName, options = [] as Array<Option>, selectedValue = $bindable(undefined), primary = true } = $props()
    import { onMount } from "svelte";

    let element = undefined as undefined|HTMLElement

    type Option = {
       value: string,
       label: string
    }

    onMount(() => {
        if (primary) {
            document.addEventListener('keyup', (event: any) => {
                let isFocusedInside = element?.contains(document.activeElement)
                if (!isFocusedInside) {
                    if (event.code == "KeyQ") {
                        const firstChild = element?.querySelector('.radioInput') as HTMLElement
                        firstChild?.focus()
                    }
                    if (event.code == "KeyW") {
                        const children = element?.querySelectorAll('.radioInput')
                        const lastChild = children?.[children.length - 1] as HTMLElement
                        lastChild?.focus()
                    }
                }
            })

            element?.addEventListener('keyup', (event) => {
                if (event.code == "KeyW") {
                    ((event.target as HTMLElement)?.parentElement?.nextElementSibling?.querySelector("input") as HTMLElement)?.focus()
                }
                if (event.code == "KeyQ") {
                    ((event.target as HTMLElement)?.parentElement?.previousElementSibling?.querySelector("input") as HTMLElement)?.focus()
                }
            })
        }
    })
</script>

<div role="radiogroup" class="picker" bind:this={element}>
    {#each options as option}
        <!-- This click event is an extremely hacky solution - I really couldn't find anything else. -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="item" onclick={() => {selectedValue = option.value, document.getElementById(radioName + "-choice-" + option.value)?.focus()}}>
            <input 
                type="radio" 
                id={radioName + "-choice-" + option.value} 
                name={radioName} 
                value={option.value}
                bind:group={selectedValue}
                class="radioInput"
            >
            <label 
                for={radioName + "-choice-" + option.value}
            >
                {option.label}
            </label>
        </div>
    {/each}
</div>

<style>
    .picker {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.8em;
        padding: 0.4em;
        background-color: var(--c-color-background-B);
        border-radius: 8pt;
        overflow-y: auto;
        max-width: 100%;
        user-select: none;
    }
    .item {
        color: var(--c-color-accent-A);
        font-weight: 500;
        background-color: var(--c-color-accent-A-contrast);
        border-radius: 8pt;
        padding: 0.8ch;
        transition: all 200ms;
    }
    .item input[type="radio"] {
        accent-color: var(--c-color-accent-A);
        transition: all 200ms;
    }
    .item input[type="radio"]:focus {
        outline: none;
    }
    .item:has(input[type="radio"]:focus) {
        outline: dashed 2pt var(--c-color-accent-A);
        outline-offset: 2pt;
    }
    .item:has(input:checked) {
        background-color: var(--c-color-accent-A);
        color: var(--c-color-accent-A-contrast);
        font-weight: 550;
    }
</style>
