<script lang="ts">
    let { word, element = $bindable(undefined), ...rest } = $props()
</script>

<div class="word" bind:this={element} {...rest}>
    {word}
</div>

<style>
    .word {
        padding: 1ch;

        border-radius: 8pt;
        background-color: var(--background-color);
        color: var(--color);
        font-weight: 600;
        transition: all 100ms;
    }

    .word:active {
        outline: unset;
        transform: rotate(-7deg);
    }
</style>