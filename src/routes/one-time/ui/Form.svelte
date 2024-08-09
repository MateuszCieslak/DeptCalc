<script lang="ts">
    import type { DeptCalculation } from "../../models/dept-calculation";
    import { createEventDispatcher, onMount } from 'svelte';

    type CalculationData = {
        interest: number,
        captial: number,
        numberOfInstallments: number,
        surcharge: number,
        name: string
    }

    const dispatch = createEventDispatcher();
    let interest: number;
    let captial: number;
    let numberOfInstallments: number;
    let surcharge: number;
    let showSaveModal = false;
    let saveName: string = '';
    let savedItems: CalculationData[] = [];

    function calc(capital: number, interest: number, numberOfInstallments:number) {
        const i = interest / 12 / 100; 
        const R = (capital * i * Math.pow(1 + i, numberOfInstallments)) / (Math.pow(1 + i, numberOfInstallments) - 1);
        return R.toFixed(2); 
    }

    function calculate() {
        const standardResult = calc(captial, interest, numberOfInstallments);
        const surchargeResult = calc(captial - surcharge, interest, numberOfInstallments);

        dispatch('calculated', { standardResult, surchargeResult });
    }

    function reset() {
        dispatch('calculated', null);
    }

    function getStoredData() {
        const stored = localStorage.getItem('saves');
        return stored ? JSON.parse(stored) : [];
    }

    function save() {
        // const data: CalculationData[] = getStoredData();
        // const other = data.filter(x => x.name !== saveName);
        // savedItems = [ ...other, { interest, captial, installment, surcharge, name: saveName } ];
        // localStorage.setItem('saves', JSON.stringify(savedItems));
        // showSaveModal = false;
        // saveName = '';
    }

    function remove(item: CalculationData) {
        savedItems = savedItems.filter(x => x.name !== item.name);
        localStorage.setItem('saves', JSON.stringify(savedItems));
    }

    function load(item: CalculationData) {
        // reset();
        // interest = item.interest;
        // captial = item.captial;
        // installment = item.installment;
        // surcharge = item.surcharge;
    }

    onMount(() => {
		savedItems = getStoredData();
	});
</script>

<div>
    {#if savedItems.length > 0}
        <div class="saved-items">
            <label>Zapisane dane</label>
            {#each savedItems as item}
                <div class="btn-group saved-items__pill" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-secondary" on:click={() => load(item)}>{item.name}</button>
                    <button type="button" class="btn btn-outline-secondary" on:click={() => remove(item)}>X</button>
                </div>
            {/each}
        </div>
    {/if}
    <form on:submit={calculate}>
        <div>
            <label for="interest" class="form-label">Oprocentowanie</label>
            <input 
                type="number" 
                class="form-control" 
                step="0.01"
                min="0.01" 
                bind:value={interest} 
                on:keydown={() => reset()}
                required
                placeholder="np 3,45%"
            />
        </div>
        
        <div>
            <label for="interest" class="form-label">Kapitał do spłaty</label>
            <input 
                type="number" 
                class="form-control" 
                step="0.01" 
                min="1"
                bind:value={captial} 
                on:keydown={() => reset()}
                required
                placeholder="np 300 000 zł"
            />
        </div>

        <div>
            <label for="interest" class="form-label">Ilośc rat</label>
            <input 
                type="number" 
                class="form-control" 
                min="1"
                bind:value={numberOfInstallments} 
                on:keydown={() => reset()}
                required
                placeholder="np 300"
            />
        </div>

        <div>
            <label for="interest" class="form-label">Kwota nadpłaty</label>
            <input 
                type="number" 
                class="form-control" 
                step="0.01" 
                min="1"
                bind:value={surcharge}
                on:keydown={() => reset()} 
                required
                placeholder="np 1000 zł"
            />
        </div>

        <div class="text-end">
            <!-- <button class="btn btn-light" type="button" on:click={() => showSaveModal = true}>Zapisz</button> -->
            <button class="btn btn-primary" type="submit">Oblicz</button>
        </div>
    </form>
</div>

{#if showSaveModal}
    <div class="modal-backdrop fade show"></div>

    <div 
        class="modal fade show" 
        id="exampleModal" 
        tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden={!showSaveModal}
        style={ `display: ${showSaveModal ? 'block' : 'none'}`}
    >
    <form class="modal-dialog" on:submit={save}>
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Zapisz dane</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => showSaveModal = false}></button>
        </div>
        <div class="modal-body">
            <label>Wybierz co nadpisac</label>
            <select class="form-select" bind:value={saveName}>
                {#each savedItems as item}
                    <option value={item.name}>{item.name}</option>
                {/each}
            </select>
            <p class="mt-4">lub</p>
            <label class="form-label">Podaj nowa nazwe</label>
            <input type="text" class="form-control" placeholder="Np. kredyt dom" required bind:value={saveName} />
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary" >Zapisz</button>
        </div>
        </div>
    </form>
    </div>
{/if}

<style>
    .saved-items {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 1rem 0;
    }

    .saved-items__pill .btn:first-child {
        border-radius: 2rem 0 0 2rem;
    }

    .saved-items__pill .btn:last-child {
        border-radius: 0 2rem 2rem 0;
    }
</style>