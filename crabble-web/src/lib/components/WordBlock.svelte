<script lang="ts">
    let { word, element = $bindable(undefined), ...rest } = $props()
</script>

<div class="word" bind:this={element} {...rest}>
    {word}
</div>

<style>
    .word {
        --background-color: var(--c-color-accent-A);
        --color: var(--c-color-accent-A-contrast);

        padding: 1ch;

        border-radius: 8pt;
        background-color: var(--background-color);
        color: var(--color);
        font-weight: 600;
        animation: 140ms bounce;
    }

    @keyframes bounce {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    .word:active {
        outline: none;
        transform: rotate(-7deg);
    }
</style>