<script lang="ts">
	import Form from './ui/Form.svelte';

	let results: { standardResult: number, surchargeResult: number } | undefined = undefined;
</script>

<svelte:head>
	<title>Kalkulator oszczędności</title>
	<meta name="description" content="Kalkulator oszczędności nadpłacania kredytu" />
</svelte:head>

<section>
	<h1 class="text-center heading">Kalkulator obnienia raty</h1>

	<Form on:calculated={e => results = e.detail} />

	{#if results }
		<div>
			Aktualna rata kredytu: {results.standardResult}zł
		</div>
		<div>
			Rata po nadpłacie: {results.surchargeResult}zł
		</div>
	{/if}
</section>

<style>

</style>
