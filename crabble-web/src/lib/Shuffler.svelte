<script>
    import WordBlock from "./components/WordBlock.svelte";

    let words = ["meow", "woo", "hoo"]
</script>

<div class="main-container">
    {#each words as word} 
    <WordBlock {word} />
    {/each}
</div>

<style>
    .main-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1ch;
    }
</style>