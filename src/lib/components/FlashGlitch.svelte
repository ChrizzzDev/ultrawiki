<script lang="ts">
	import { onMount } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let el: HTMLElement;

	let {
		duration = 6,
		minDelay = 0,
		maxDelay = 5,
		classList
	}: Props = $props();

	onMount(() => {
		const delay = ((Math.random() * (maxDelay - minDelay)) + minDelay).toFixed(2);
		el.style.setProperty('animation', `flash-glow ${duration}s infinite`);
		el.style.setProperty('animation-delay', `${delay}s`);
	});

	interface Props {
		duration?: number;
		minDelay?: number;
		maxDelay?: number;
		classList?: ClassValue;
	}
</script>

<div bind:this={el} class="flash">
	<span class={classList}>
		<slot/>
	</span>
</div>