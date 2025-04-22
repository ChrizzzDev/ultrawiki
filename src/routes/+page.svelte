<svelte:head>
	<title>ULTRAWIKI - Home</title>
	<style>
		body {
			background: linear-gradient(135deg, #1a1a1a 70%, #7a0000 100%);
			background-size: cover;
			min-height: 100vh;
			overflow-x: hidden;
			overflow-y: hidden;
		}
		.hero-btn {
			box-shadow: 0 0 10px 2px #ff0000, 0 0 20px 4px #7a0000 inset;
			transition: transform 0.1s, box-shadow 0.1s;
		}
		.hero-btn:hover {
			transform: scale(1.08) rotate(-2deg);
			box-shadow: 0 0 20px 6px #ff0000, 0 0 30px 8px #7a0000 inset;
			background: #b30000;
		}
		.uk-phrase {
			font-size: 1.5rem;
			color: #ff0000;
			text-shadow: 0 0 8px #fff, 0 0 16px #ff0000;
			animation: flicker 2s infinite alternate;
			font-family: 'VCR OSD Mono', monospace;
			letter-spacing: 1.5px;
		}
		@keyframes flicker {
			0% { opacity: 1; }
			45% { opacity: 0.8; }
			50% { opacity: 0.5; }
			55% { opacity: 0.8; }
			100% { opacity: 1; }
		}
		.uk-card {
			background: rgba(0,0,0,0.85);
			border: 3px solid #fff;
			box-shadow: 0 0 20px 2px #ff0000;
			border-radius: 12px;
			padding: 1.5em 2em;
			margin: 2em auto;
			max-width: 500px;
		}
	</style>
</svelte:head>

<!-- Hero Section -->
<div class="flex h-screen items-center justify-center -mt-40">
	<div class="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
		<h1 class="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl glitch-anim">
			Welcome to
			<span class="vcr text-red-600" style="font-size:1.2em;">ULTRAWIKI</span>
		</h1>
		<p class="mt-6 text-lg leading-8 text-gray-300" style="text-shadow:0 0 8px #ff0000;">
			This wiki is dedicated to <strong class="text-red-500">ULTRAKILL</strong>.<br>
			Here you will find information about enemies, weapons, levels, bosses and much more!
		</p>
		<div class="mt-5 flex items-center justify-center gap-x-6">
			<a
				href="/levels"
				class="hero-btn rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
				rel="noreferrer"
				data-sveltekit-preload-data
				>Discover  →</a
			>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="text-center -mt-20">
	<section>
		<div class="uk-card">
			<div class="uk-phrase">
				MANKIND IS DEAD <br />
				BLOOD IS FUEL <br />
				HELL IS FULL
			</div>
		</div>
	</section>
</main>
