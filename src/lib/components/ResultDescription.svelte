<script lang="ts">
    import { formatDate } from '$lib/utils/date-format';
	import CostFormatted from './CostFormatted.svelte';

    const { description, results, savings } = $$props;
</script>

<p>
    {description} <b><u><CostFormatted cost={results.cost} /></u></b>, 
    {#if savings && savings > 0}
        <span>
            zaoszczędzisz <b class="savings"><CostFormatted cost={savings} /></b>
        </span>
    {/if}
    który spłacisz dnia <b>{formatDate(results.endDate)}</b>.
</p>

<style>
    .savings {
        color: green;
    }
</style>