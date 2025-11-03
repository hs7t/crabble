<script lang="ts">
  import Shuffler from "./lib/Shuffler.svelte";

</script>

<main>
    <Shuffler></Shuffler>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;

    width: clamp(50dvw, 500px, 80dvw);
    margin: auto;
  }
</style>
