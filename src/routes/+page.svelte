<script lang="ts">
    import type { DeptCalculation } from '../models/dept-calculation';
    import CalculationResults from './ui/CalculationResults.svelte';
	import Form from './ui/Form.svelte';

	let results: { standardResult: DeptCalculation, surchargeResult: DeptCalculation } | undefined = undefined;
</script>

<svelte:head>
	<title>Kalkulator oszczędności</title>
	<meta name="description" content="Kalkulator oszczędności nadpłacania kredytu" />
</svelte:head>

<section>
	<h1 class="text-center heading">Kalkulator oszczędności nadpłacania kredytu</h1>

	<Form on:calculated={e => results = e.detail} />

	{#if results }
		<CalculationResults label="Normalny tryb" deptCalculation={results.standardResult} />
		<CalculationResults label="Tryb nadpłat" deptCalculation={results.surchargeResult} />
	{/if}
</section>

<style>

</style>
