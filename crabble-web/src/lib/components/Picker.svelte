<script lang="ts">
    let { radioName, options = [] as Array<Option> } = $props()

    type Option = {
       value: string,
       label: string
    }
</script>

<div role="radiogroup">
    {#each options as option}
        <input 
            type="radio" 
            id={radioName + "-choice-" + option.value} 
            name={radioName} 
            value={option.value}
        >
        <label 
            for={radioName + "-choice-" + option.value}
        >
            {option.label}
        </label>
    {/each}
</div>