<script>
    let { content = $bindable("click me!"), action, disabled = $bindable(false), id = "button-r", primary = false, addedClass = "" } = $props()
</script>

<button onclick={action} {disabled} {id} class={`${primary ? "primary" : "secondary"} ${addedClass}`}>
    {content}
</button>

<style>
    button {
        font-size: 1.2rem;
        padding: 0.4ch;
        font-weight: 600;
        text-transform: uppercase;
        background-color: var(--c-color-background-B);
        color: var(--c-color-primary);
        border: var(--c-border-generic);
        border-radius: 8pt;
        font-family: var(--c-font-primary);
        transition: all 100ms;
        cursor: pointer;
    }

    button.primary {
        color: var(--c-color-accent-A-contrast);
        background-color: var(--c-color-accent-A);
    }

    button:focus {
        outline: var(--c-border-attention);
        outline-offset: 3pt;
    }

    button:active {
        transform: scale(1.08);
    }

    button:hover {
        opacity: 0.9;
    }
</style>