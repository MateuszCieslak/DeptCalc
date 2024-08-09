<script lang="ts">
    import type { DeptCalculation } from "../../models/dept-calculation";

    export let deptCalculation: DeptCalculation | undefined;
    export let label: string;

    $: periodFormated = formatPeriod(deptCalculation?.months || 0);
    $: endDateFormated = formatEndDate(deptCalculation?.months || 0);

    function formatPeriod(period: number) {
		var years = Math.floor(period / 12);
		var months = period - years * 12;
		var result = '';
		if (years > 0) {
			result += years + ' lat ';
		}
		if (months > 0) {
			result += months + ' miesięcy';
	    }
        return result;
    }

    function formatEndDate(period: number) {
		var date = new Date();
		var newDate = new Date(date.setMonth(date.getMonth() + period));
		return newDate.toLocaleDateString("pl");
	}
</script>

{#if deptCalculation}
<div>
    <h3>{label}</h3>
    <p>
        Koszt = {deptCalculation.cost}zł <br />
        Czas = {periodFormated} ({deptCalculation.months} rat)<br />
        Data zakończenia = {endDateFormated}
    </p>
</div>
{/if}