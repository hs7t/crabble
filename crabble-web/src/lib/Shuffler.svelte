<script>
  import WordBlock from "./components/WordBlock.svelte";

    let words = ["meow"]
</script>

<div class="main-container">
    {#each words as word} 
    <WordBlock {word} />
    {/each}
</div>

<style>
    .main-container {
        width: 100%;
    }
</style>