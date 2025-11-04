<script>
    let { currentValue, total } = $props()
    let percentageElapsed = $derived( (currentValue / total) * 100 )
</script>

<div class="progress-bar" role="progressbar" aria-valuenow={percentageElapsed}>
    <span class="progress" style="--current-percentage: {percentageElapsed}%;"></span>
</div>

<style>
    .progress-bar {
        width: 100%;
        height: 1rem;
    }
    
    .progress-bar .progress {
        --current-percentage: 100%;

        width: var(--current-percentage);
        height: 100%;
    }
</style>