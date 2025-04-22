<script lang="ts">
	import WIP from '$lib/components/WIP.svelte';
</script>

<WIP />

<!-- <script lang="ts">
	import type { PageProps } from './$types';
	import type { Enemy } from 'dbt';

	let { data }: PageProps = $props();

	const imageModule = async (name: string) =>
		await import(`../../lib/assets/icons/enemies/${name}.webp`);

	function groupEnemies() {
		const enemies = data.enemies;
		const groupedEnemiesByRace: { [key: string]: { [key: string]: Enemy[] } } = {};

		for (const enemy of enemies) {
			const race = enemy.Race;
			const category = enemy.Category ?? '???';

			if (!groupedEnemiesByRace[race]) groupedEnemiesByRace[race] = {};

			if (!groupedEnemiesByRace[race][category]) groupedEnemiesByRace[race][category] = [];

			groupedEnemiesByRace[race][category].push(enemy);
		}

		return groupedEnemiesByRace;
	}

	let groupedEnemies = $state<{
		[key: string]: {
			[key: string]: Enemy[];
		};
	}>({});

	groupedEnemies = groupEnemies();
</script> 

<svelte:head>
	<title>ULTRAWIKI - Enemies</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedEnemies) as [race, categories]}
		<section class="mb-16">
			<h2 class="vcr text-4xl font-extrabold text-red-600 drop-shadow-lg mb-8 border-b-2 border-red-700 pb-2 glitch-anim">{race}</h2>
			{#each Object.entries(categories) as [category, enemies]}
				<div class="mb-10">
					<h3 class="vcr text-2xl font-bold text-white tracking-widest mb-6 uppercase text-center glitch-anim-soft">{category}</h3>
					<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
						{#each enemies as enemy, index}
						{@const slug = enemy.Name.replace(/\s+/g, '_')}
							<a
								href={"/enemies/" + slug}
								class="group relative block rounded-md overflow-hidden border-4 border-red-500 bg-black hover:scale-[1.03] transition-transform duration-150 animate-fade-in shadow-[4px_4px_0_#ff0000]"
								data-sveltekit-preload-code
								data-sveltekit-preload-data
								style="animation-delay: {index * 80}ms"
							>
								<div class="relative">
									{#await imageModule(enemy.Name)}
										<div class="h-56 w-full animate-pulse bg-neutral-800"></div>
									{:then { default: src }}
										<img
											loading="lazy"
											{src}
											alt={enemy.Name}
											class="h-56 w-full object-cover transition-transform duration-200 group-hover:scale-110"
											draggable="false"
										/>
									{:catch}
										<div class="h-56 w-full flex items-center justify-center text-red-500 bg-neutral-900">Sin imagen</div>
									{/await}
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
									<div class="absolute inset-0 pointer-events-none">
										<span class="block w-full h-full border-2 border-red-600 rounded-xl opacity-0 group-hover:opacity-100 animate-border-glow z-10"></span>
									</div>
									<div class="absolute bottom-0 left-0 w-full px-4 py-3 bg-black/60 backdrop-blur-sm z-0">
										<span class="vcr text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{enemy.Name}</span>
									</div>
								</div>
								<div class="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-1 rounded shadow vcr">{category}</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</section>
	{/each}
</div>

<style>
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(30px);}
		to { opacity: 1; transform: translateY(0);}
	}
	.animate-fade-in {
		animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
	}
	@keyframes border-glow {
		0%, 100% { box-shadow: 0 0 0 0 #ff0000; opacity: 0.7;}
		50% { box-shadow: 0 0 16px 4px #ff0000, 0 0 32px 8px #fff; opacity: 1;}
	}
	.animate-border-glow {
		animation: border-glow 1.2s infinite;
	}
</style> -->