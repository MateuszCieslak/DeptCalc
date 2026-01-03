<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main class="main">
		{@render children()}

		<footer>
			<p>
				Aplikacja stworzona przez <a href="https://codemat.pl" target="_blank">CodeMat</a>
			</p>
		</footer>
	</main>
</div>

<style>
	.main {
		display: block;
		width: 100%;
		padding: 1rem;
	}

	@media all and (min-width: 600px) {
		.main {
			max-width: 600px;
			margin: 0 auto;
		}
	}
</style>
