<script lang="ts">
	import '../app.css';
	import { Navbar } from '$lib';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	console.log(data);
</script>

<svelte:head>
	<title>Catstagram</title>
	<link rel="icon" href="/favicon.png" />
	<meta name="description" content="Catstagram is a social network for cats." />
</svelte:head>

<main class="px-2 bg-white text-black min-h-screen">
	<Navbar user={data.user} />
	<slot />
</main>
