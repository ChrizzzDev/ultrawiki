<svelte:head>
	<title>ULTRAWIKI - Home</title>
<style>
		body {
			margin: auto;
			overflow-y: auto;
		}
		.hero-btn {
			box-shadow:
				0 0 10px 2px #ff0000,
				0 0 20px 4px #7a0000 inset;
			transition:
				transform 0.1s,
				box-shadow 0.1s;
		}
		.hero-btn:hover {
			transform: scale(1.08) rotate(-2deg);
			box-shadow:
				0 0 20px 6px #ff0000,
				0 0 30px 8px #7a0000 inset;
			background: #b30000;
		}
		.uk-phrase {
			font-size: 1.4rem;
			color: #ff0000;
			text-shadow:
				0 0 4px #ff0000,
				0 0 8px #121212;
			font-family: 'VCR OSD Mono', monospace;
			letter-spacing: 1.5px;
			line-height: 1.3;
		}
		.uk-card {
			border: 2px solid #ff0000;
			/* background: rgba(0, 0, 0, 0.4); */
			box-shadow:
				0 0 8px #ff0000,
				0 0 20px #7a0000,
				inset 0 0 8px #7a0000;
			border-radius: 12px;
			padding: 5px;
			max-width: 450px;
		}
		.scanlines {
			inset: 0;
			pointer-events: none;
			background-image: url(/scanlines.png);
			z-index: 10;
		}
	</style>
</svelte:head>

<script lang="ts">
	import FlashGlitch from '$lib/components/FlashGlitch.svelte';
</script>

<div class="relative flex h-screen w-screen flex-col items-center justify-center text-center">
	<div class="fixed inset-0 z-0 flex items-center justify-center opacity-35">
		<img src="/skull.gif" class="w-52" alt="ULTRAKILL Skull death screen" draggable="false" />
		<div class="absolute inset-0 z-10 bg-black/60"></div>
	</div>

	<!-- Main Content -->
	<div class="z-30 max-w-full px-4 lg:max-w-3xl hero">
		<h1 class="text-4xl inline font-bold tracking-tight text-white sm:text-5xl glitch layers">
			Welcome to
			<div class="text-red-600 vcr inline-block leading-none">
				<FlashGlitch>ULTRAWIKI</FlashGlitch>
			</div>
		</h1>		
		<p
			class="crt-flicker mt-6 text-wrap text-xl leading-8 text-gray-300"
			style="text-shadow: 0 0 6px #ff0000;"
		>
			This wiki is dedicated to <strong class="vcr text-red-500">ULTRAKILL</strong>.<br />
			Here you will find information about enemies, weapons, levels, bosses and much more!
		</p>
		<div class="mt-5 flex items-center justify-center gap-x-6">
			<a
				href="/levels"
				class="hero-btn rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				rel="noreferrer"
				data-sveltekit-preload-data
			>
				Discover →
			</a>
		</div>

		<div class="uk-card crt-flicker scanlines mx-auto mt-16">
			<div class="uk-phrase">
					MANKIND IS DEAD <br />
					BLOOD IS FUEL <br />
					HELL IS FULL
			</div>
		</div>
	</div>
</div>
