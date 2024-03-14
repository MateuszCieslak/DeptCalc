<script>
	import { page } from '$app/stores';

	let menuOpen = false;
</script>

<header>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container">
		  <button 
		  	class="navbar-toggler" 
		  	type="button" 
			data-bs-toggle="collapse" 
			data-bs-target="#navbarNav" 
			aria-controls="navbarNav" 
			aria-expanded="false" 
			aria-label="Toggle navigation"
			on:click={() => menuOpen = !menuOpen}
		>
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" class:show={menuOpen} id="navbarNav">
			<ul class="navbar-nav">
			  <li class="nav-item">
				<a class="nav-link active" aria-current={$page.url.pathname === '/' ? 'page' : undefined} href="/">Home</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" aria-current={$page.url.pathname === '/about' ? 'page' : undefined} href="/about">About</a>
			  </li>
			</ul>
		  </div>
		</div>
	  </nav>
</header>

<style>
	a {
		position: relative;
	}

	a[aria-current='page']::before {
		content: "";
		height: 2px;
		width: 100%;
		bottom: 0;
		left: 0;
		position: absolute;
		display: block;
		background: var(--color-theme-1);
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
