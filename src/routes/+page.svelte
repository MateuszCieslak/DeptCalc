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

	<p class="description text-muted">
		Kalkulator oblicza ile zaoszczędzimy nadpłacając kredyt daną kwotą miesięcznie oraz w jakim czasie spłacimy go szybciej.
		Kalkulator jest bardzo prosty i jego szacunki są przybliżone.
	</p>

	<Form on:calculated={e => results = e.detail} />

	{#if results }
		<CalculationResults label="Normalny tryb" deptCalculation={results.standardResult} />
		<CalculationResults label="Tryb nadpłat" deptCalculation={results.surchargeResult} />
	{/if}
</section>

<style>

</style>
