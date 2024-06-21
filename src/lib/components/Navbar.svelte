<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	import { textColors } from '$lib';

	let textColor = 'text-blue-700';
	let showColorSelector = false;

	// Check if localStorage is available and set textColor from it
	if (typeof window !== 'undefined' && window.localStorage) {
		textColor = localStorage.getItem('textColor') || textColor;
	}

	$: {
		if (typeof window !== 'undefined' && window.localStorage) {
			document.body.className = textColor;
			localStorage.setItem('textColor', textColor);
		}
	}

	function updateTextColor(event: Event) {
		const target = event.target as HTMLSelectElement;
		textColor = target.value;
	}

	function toggleColorSelector() {
		showColorSelector = !showColorSelector;
	}
</script>

<nav class="flex justify-between items-center">
	<img src="/catstagram-main.png" alt="Catstagram" class="h-12 w-12" />
	<h1 class={`text-xl ${textColor}`}>Catstagram</h1>
	<SignedIn>
		<UserButton afterSignOutUrl="/" />
		<button on:click={toggleColorSelector}>
			{#if showColorSelector}Hide Color Selector{:else}Show Color Selector{/if}
		</button>
		{#if showColorSelector}
			<select bind:value={textColor} on:change={updateTextColor}>
				{#each Object.entries(textColors) as [color, className]}
					<option value={className}>{color}</option>
				{/each}
			</select>
		{/if}
	</SignedIn>
	<SignedOut>
		<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
		<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
	</SignedOut>
</nav>
