<script lang="ts">
    import WordBlock from "./components/WordBlock.svelte";
    import { dndzone } from 'svelte-dnd-action'

    let words = [{id: 1, title: "meow"}, {id: 2, title: "woo"}, {id: 3, title: "hoo"}]

	function handleSort(e: any) {
		words = e.detail.items;
	}

</script>

<div use:dndzone="{{items: words}}" on:consider={handleSort} on:finalize={handleSort} class="main-container">
    {#each words as word(word.id)} 
    <WordBlock word={word.title} />
    {/each}
</div>

<style>
    .main-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1ch;
        overflow-y: scroll;
    }
</style>