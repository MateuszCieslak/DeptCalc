<script lang="ts">
	import ResultDescription from '$lib/components/ResultDescription.svelte';
	import { onMount } from 'svelte';

	type variantResult = {
		cost: number;
		remaining: number;
		items: any[];
		endDate: Date;
	}
	type totalResult = {
		installment: number,
		standardResult: variantResult,
		decrasingRemainingOfInstallmentsResults: variantResult,
		decrasingInstallmentValueCost: variantResult
	}

	let capital: number | undefined = undefined;
	let interest: number | undefined = undefined;
	let numberOfInstallments: number | undefined = undefined;
	let surcharge: number | undefined = undefined;

	onMount(() => {
		const backupData = localStorage.getItem('backup');
		if (backupData) {
			const data = JSON.parse(backupData);
			capital = data.capital;
			interest = data.interest;
			numberOfInstallments = data.numberOfInstallments;
			surcharge = data.surcharge;
		}
	});

	let results: totalResult | undefined = undefined;

	function calculate() {
		const installment = calculateInstallment(capital!, interest!, numberOfInstallments!);
		const standardResult = calculateDecrasingLoanDurationVariant(capital!, installment, interest!);
		const decrasingRemainingOfInstallmentsResults = calculateDecrasingLoanDurationVariant(capital!, installment + surcharge!, interest!);
		const decrasingInstallmentValueCost = calculateDecrasingInstallmentVariant(capital!, numberOfInstallments!, interest!, surcharge!);
		results = { installment, standardResult, decrasingRemainingOfInstallmentsResults, decrasingInstallmentValueCost };
		localStorage.setItem('backup', JSON.stringify({ capital, interest, numberOfInstallments, surcharge }));
	}

	function calculateInstallment(capital: number, interest: number, numberOfInstallments: number): number {
        const i = interest / 12 / 100; 
        const R = (capital * i * Math.pow(1 + i, numberOfInstallments)) / (Math.pow(1 + i, numberOfInstallments) - 1);
        return Number(R.toFixed(2)); 
    }

	function calculateDecrasingLoanDurationVariant(capital: number, installment: number, interest: number): variantResult {
		var cost = 0;
		var iterations = 0;
		var items = [];
		while (capital > 0) {
			var c = capital * (interest * 0.01) / 12;
			var rata = installment - c;
			cost += c;
			capital = capital - rata;
			iterations++;
			items.push({
				iterations: iterations,
				dept: Math.round(capital),
				capital: Math.round(rata),
				interest: Math.round(c),
				amount: Math.round(rata + c)
			});
		}

		return { cost: Math.round(cost), remaining: iterations, items, endDate: calculateEndDate(iterations) };
	}

	function calculateDecrasingInstallmentVariant(capital: number, remaining: number, interest: number, surcharge: number = 0): variantResult {
		let totalCost = 0;
		const originalRemaining = remaining;

		while(remaining > 0 && capital > 0) {
			const installment = calculateInstallment(capital, interest, remaining) + surcharge;
			const cost = capital * (interest * 0.01) / 12;
			const installmentCapital = installment - cost;
			totalCost += cost;

			capital -= installmentCapital;
			remaining--;
		}

		return { cost: Math.round(totalCost), remaining: originalRemaining, items: [], endDate: calculateEndDate(originalRemaining) };
	}

	function calculateEndDate(remaining: number) {
		const date = new Date();
		date.setMonth(date.getMonth() + remaining);
		return date;
	}

	function reset() {
		results = undefined;
	}
</script>

<svelte:head>
	<title>Kalkulator oszczędności nadpłat kredytu hipotecznego</title>
	<meta name="description" content="Bardzo prosty w uzyciu kalkulator dzięki, któremu mozemy szybko obliczyc jakie oszczednosci przyniesie nam comiesieczne nadplacanie kredytu" />
</svelte:head>

<section class="my-order">
	<h1>Kalkulator oszczędności nadpłacania kredytu</h1>

	<p class="description">
		Kalkulator oblicza ile zaoszczędzimy nadpłacając kredyt daną kwotą miesięcznie oraz w jakim czasie spłacimy go szybciej. 
		Kalkulator jest bardzo prosty i jego szacunki są przybliżone. Mozemy zarówno obliczyc czas, jak i kwotę raty. Kalkulator 
		oblicza oba warianty czyli skracanie okresu trwania kredytu oraz obnizanie raty.
	</p>

	<form class="form-group" on:submit|preventDefault={calculate}>
		<div>
			<label for="capital" class="form-label">Kapitał</label>
			<input 
				type="number" 
				inputmode="decimal"
				required
				min="1"
				step="0.01" 
				class="form-control"
				placeholder="np. 100 000" 
				id="capital"
				bind:value={capital}
				on:keydown={() => reset()}
			/>
		</div>

		<div>
			<label for="interest" class="form-label">Oprocentowanie</label>
			<input 
				type="number" 
				inputmode="decimal"
				required
				min="0.1" 
				step="0.01"
				class="form-control"
				placeholder="np 8,5%" 
				id="interest"
				bind:value={interest}
				on:keydown={() => reset()}
			/>
		</div>

		<div>
			<label for="remaining" class="form-label">Pozostała ilość rat do spłaty</label>
			<input 
				type="number" 
				inputmode="numeric"
				required
				min="1" 
				step="1"
				class="form-control"
				placeholder="np. 300" 
				id="remaining"
				bind:value={numberOfInstallments}
				on:keydown={() => reset()}
			/>
		</div>

		<div>
			<label for="surcharge" class="form-label">Kwota miesięcznej nadpłaty</label>
			<input 
				type="number" 
				inputmode="numeric"
				required
				min="1" 
				step="1"
				class="form-control"
				placeholder="np. 1000" 
				id="surcharge"
				bind:value={surcharge}
				on:keydown={() => reset()}
			/>
		</div>

		<div>
			<button type="submit" class="btn btn-primary">Oblicz</button>
		</div>
	</form>

	{#if results}
		<div>
			<h2>Wyniki</h2>

			<p>Twoja rata to <b>{results.installment}</b></p>

			<ResultDescription description="Koszt kredytu to" results={results.standardResult} />
			<ResultDescription 
				description="Koszt kredytu nadpłacanego w celu skrócenia czasu spłaty to" 
				results={results.decrasingRemainingOfInstallmentsResults} 
				savings={results.standardResult.cost - results.decrasingRemainingOfInstallmentsResults.cost}
			/>
			<ResultDescription 
				description="Koszt kredytu nadpłacanego w celu zmniejszenia raty to" 
				results={results.decrasingInstallmentValueCost} 
				savings={results.standardResult.cost - results.decrasingInstallmentValueCost.cost}
			/>			
		</div>
	{/if}
</section>

<style>
	.my-order {
		display: flex;
		flex-direction: column;
	}

	.description {
		order: 1;
	}
</style>
