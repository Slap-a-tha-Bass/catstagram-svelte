<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let user;

	let showDropdown = false;
	let dropdownRef: HTMLDivElement | null = null;

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function hideDropdown() {
		showDropdown = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			hideDropdown();
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<nav class="flex justify-between items-center p-2">
	<div class="flex items-center gap-x-2">
		<img src="/catstagram-main.png" alt="Catstagram" class="max-w-8" />
		<h1 class="text-xl">Catstagram</h1>
	</div>
	<div>
		{#if user}
			<div class="relative" bind:this={dropdownRef}>
				<button on:click={toggleDropdown}>
					<img
						src={user.payload.picture}
						alt={user.payload.name}
						class="max-w-8 rounded-full cursor-pointer"
					/>
				</button>
				{#if showDropdown}
					<div
						class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10"
					>
						<p class="p-2 text-xs border-b border-gray-200">{user.payload.name}</p>
						<form action="/sign-out" method="GET" class="p-2">
							<button class="w-full text-left text-xs" type="submit">Sign Out</button>
						</form>
					</div>
				{/if}
			</div>
		{:else}
			<a href="/sign-in">Sign In</a>
		{/if}
	</div>
</nav>
