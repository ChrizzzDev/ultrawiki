<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { seen } from '$lib/shared.svelte';

	let { duration = 1500 }: { duration?: number } = $props();
	let showSkull = $state(true);

	onMount(() => {
		let id = setTimeout(() => {
			showSkull = !showSkull;
		}, duration);

		onDestroy(() => clearTimeout(id));
	});
</script>

<div>
	{#if showSkull}
		<div
			class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
			transition:fade={{ duration: seen.val ? 500 : 1500 }}
			onanimationend={() => seen.val = true}
		>
			<img src="/skull.gif" alt="ULTRAKILL Skull death screen" class="w-52" draggable="false" />
		</div>
	{/if}
</div>
