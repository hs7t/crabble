<script>
    let { currentValue, maxValue } = $props()
    let percentageElapsed = $derived( (currentValue / maxValue) * 100 )
</script>

<div class="progress-bar" role="progressbar" aria-valuenow={percentageElapsed}>
    <div class="progress" style="--current-percentage: {percentageElapsed}%;"></div>
</div>

<style>
    .progress-bar {
        width: 100%;
        height: 1rem;
        border-radius: 10rem;

        background-color: var(--c-color-background-B);
    }

    .progress-bar .progress {
        --current-percentage: 100%;

        width: var(--current-percentage);
        height: 100%;
        background-color: var(--c-color-accent-A);
        border-radius: 10rem;

        transition: all 200ms;
    }
</style>