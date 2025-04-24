<script lang="ts">
	import { onMount } from 'svelte';
	let el: HTMLElement;

	let {
		as = 'span',
		duration = 6,
		minDelay = 0,
		maxDelay = 5
	}: Props = $props();

	onMount(() => {
		const delay = ((Math.random() * (maxDelay - minDelay)) + minDelay).toFixed(2);
		el.style.setProperty('animation', `flash-glow ${duration}s infinite`);
		el.style.setProperty('animation-delay', `${delay}s`);
	});

	interface Props {
		as?: string;
		duration?: number;
		minDelay?: number;
		maxDelay?: number;
	}
</script>

<svelte:element this={as} bind:this={el} class="flash whitespace-nowrap">
	<span>
		<slot/>
	</span>
</svelte:element>