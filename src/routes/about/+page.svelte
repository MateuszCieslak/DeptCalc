<script lang="ts">
	// export let data;

	// async function roll() {
	// 	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	// 	data = await response.json();
	// 	console.log(data);
	// }
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Czym jest kalkulator oszczędności kredytu hipotecznego?</h1>

	<p>
		Kalkulator oblicza ile zaoszczędzimy nadpłacając kredyt daną kwotą miesięcznie oraz w jakim czasie spłacimy go szybciej.
		Kalkulator jest bardzo prosty i jego szacunki są przybliżone.
	</p>

	<p>
		Pierwsze parametry, które podajemy to oprocenotwanie naszego kredytu, kapitał jaki aktualnie nam
		pozostał do spłaty lub jaki dopiero zaciagniemy oraz miesięczna kwota raty jaka wyliczył nam bank.
		Kalkulator na tej podstawie obliczy ile czasu i odsetek będziemy musieli ponieśc w normalnym trybie.
	</p>

	<p>
		Ostatnim parametrem jest kwota jaka co miesiac będziemy nadpłacac kredyt. Na tej podsawie kalkulator
		obliczy oszczędności oraz czas w trybie nadpłat.
	</p>


	<!-- <div>{data.post.title}</div>
	<div>{data.post2.title}</div> -->

	<!-- <button on:click={roll}>Roll</button> -->
</div>
