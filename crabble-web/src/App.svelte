<script lang="ts">
  import Shuffler from "./lib/Shuffler.svelte";

</script>

<main>
    <Shuffler></Shuffler>
</main>

<style>
  :global(body) {
    font-family: var(--c-font-primary);
    font-feature-settings: 'liga' 1, 'calt' 1;
  }
  main {
    display: flex;
    flex-direction: column;

    width: clamp(50dvw, 500px, 80dvw);
    margin: auto;
  }
</style>
