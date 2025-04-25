<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();
	injectSpeedInsights();

	onMount(() => {
		document.querySelectorAll('.glitch').forEach((el) => {
			const delay = (Math.random() * 2).toFixed(2);
			(el as HTMLElement).style.animationDelay = `${delay}s`;
		});
	});
</script>

<div
	class="relative isolate overflow-x-hidden bg-gradient-to-br from-black via-neutral-950 to-primary-950/30"
>
	<svg
		class="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-white/10"
		aria-hidden="true"
	>
		<defs>
			<pattern
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="200"
				height="200"
				x="100%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 200V.5H200" fill="none"></path>
			</pattern>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
			<path
				d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
				stroke-width="0"
			></path>
		</svg>
		<rect
			width="100%"
			height="100%"
			stroke-width="0"
			fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
		></rect>
	</svg>
	<div
		class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
		aria-hidden="true"
	>
		<div
			class="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-red-700 to-red-950 opacity-20"
			style="clip-path:polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
		></div>
	</div>
	<main class="mt-20 relative z-40 crt-scanlines">
		<Nav />
		{@render children()}
	</main>
</div>
