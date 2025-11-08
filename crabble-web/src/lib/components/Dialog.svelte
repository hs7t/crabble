<script lang="ts">
    import Button from "./Button.svelte";

    let { content, actions = undefined, title = "Dialog", shown = $bindable(), dismissable = true } = $props()
    let dialogReference: HTMLDialogElement
    
    $effect(() => {
        if (shown) {
            dialogReference.showModal()
        } else {
            dialogReference.close()
        }
    })
</script>

<dialog bind:this={dialogReference} onclose={() => shown = false} closedby={ dismissable ? "any" : "none" }>
    <nav>
        <h2>{title}</h2>
        {#if dismissable}
            <Button id="close-button" content="Close" action={() => { shown = false }} />
        {/if}
    </nav>
    <section class="content">
        {@render content?.()}
    </section>
    <section class="actions">
        {@render actions?.()}
    </section>
</dialog>

<style>
    dialog {
        width: clamp(280px, 100%, 560px);
        max-height: 80dvh;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;

        color: inherit;
        font-size: inherit;
        border: var(--c-border-general);
        border-radius: var(--c-radius-primary);
        background-color: var(--c-color-background-C);

        animation: 100ms dialogEnter;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        transition-behavior: allow-discrete;
        transition: all 50ms;

        align-self: center;
        justify-self: center;
        container-name: dialog;
    }

    dialog:focus {
        outline: var(--t-border-secondary);
        outline-offset: 3pt;
    }

    @keyframes dialogEnter {
        0% {
            transform: scale(0.98);
            opacity: 0.7;
        }
        100% {
            transform: none;
            opacity: 1;
        }
    }

    dialog::backdrop {
        animation: 600ms backdropEnter forwards;
        background-color: #fff;
        opacity: 0.5;
    }

    dialog nav {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    dialog nav h2 {
        font-size: 1.5rem;
    }

    :global(#close-button) {
        align-self: flex-end;
    }

    dialog section.content {
        flex-grow: 1;
        overflow: visible;
        overflow-y: auto;
        min-height: 0;
    }

    dialog:not([open]) {
        display: none;
        transition: all;
    }
</style>