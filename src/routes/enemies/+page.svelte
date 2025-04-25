<script lang="ts">
	import type { PageProps } from './$types';
	import type { Enemy } from 'dbt';

	import FlashGlitch from '$lib/components/FlashGlitch.svelte';

	const { data }: PageProps = $props();

	const alias: H = {
		PrimeSoul: 'Prime Souls'
	};

	const color: H = {
		Lesser: 'bg-linear-to-r from-orange-900/80 via-orange-700/80 to-orange-900/80',
		Greater: 'bg-linear-to-r from-yellow-900/80 via-yellow-700/80 to-yellow-900/80',
		Supreme: 'bg-linear-to-r from-slate-900/80 via-slate-700/80 to-slate-900/80'
	};

	const pSO: { [key: string]: { card: string; name: string; color: string } } = {
		'Minos Prime': {
			card: 'bg-linear-[100deg] from-[#31515E]/80 via-[#83696C]/90 to-[#B1B3AE]/80 backdrop-blur-lg border-[#E8E8E8]',
			name: 'group-hover:text-[#8B1E3F]',
			color: '#E8E8E8'
		},
		'Sisyphus Prime': {
			card: 'bg-linear-[100deg] from-[#EDE458]/80 via-[#E7090B]/90 to-[#E67413]/80 backdrop-blur-lg border-[#FFA618]',
			name: 'group-hover:text-[#3D2678]',
			color: '#EDE458'
		}
	};

	const imageOverrides: H = {
		Drone: 'scale-90 object-contain',
		Guttertank: 'scale-100 object-cover',
		Gutterman: 'scale-100 object-cover',
		'Malicious Face': 'scale-90 object-contain',
		'Hideous Mass': 'scale-100 object-contain',
	};

	const imageModule = (name: string) => `/icons/enemies/${name}.webp`;

	function groupEnemies() {
		const enemies = data.enemies;

		const orderedRaces = ['Husk', 'Machine', 'Demon', 'Angel', 'PrimeSoul', 'Unknown', 'Rodent'];
		const orderedCategories = ['Lesser', 'Greater', 'Supreme', '???'];

		const groupedEnemiesByRace: {
			[race: string]: {
				[category: string]: Enemy[];
			};
		} = {};

		for (const enemy of enemies) {
			const race = enemy.Race;
			const category = enemy.Category ?? '???';

			if (!groupedEnemiesByRace[race]) {
				groupedEnemiesByRace[race] = {};
			}

			if (!groupedEnemiesByRace[race][category]) {
				groupedEnemiesByRace[race][category] = [];
			}

			groupedEnemiesByRace[race][category].push(enemy);
		}

		const sortedGroupedEnemies: typeof groupedEnemiesByRace = {};

		for (const race of orderedRaces) {
			if (groupedEnemiesByRace[race]) {
				const categories = groupedEnemiesByRace[race];
				const sortedCategories: { [category: string]: Enemy[] } = {};

				for (const cat of orderedCategories) {
					if (categories[cat]?.length) {
						sortedCategories[cat] = categories[cat];
					}
				}

				if (Object.keys(sortedCategories).length > 0) {
					sortedGroupedEnemies[race] = sortedCategories;
				}
			}
		}

		return sortedGroupedEnemies;
	}

	let groupedEnemies = $state<{
		[key: string]: {
			[key: string]: Enemy[];
		};
	}>({});

	groupedEnemies = groupEnemies();

	type H = { [key: string]: string };
</script>

<svelte:head>
	<title>ULTRAWIKI - Enemies</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedEnemies) as [race, categories]}
		<section class="mb-16">
			<h2
				class="vcr glitch layers mb-8 border-b-2 border-red-700 pb-2 text-4xl font-extrabold text-red-600 drop-shadow-2xl {alias[race] && 'text-center'}"
			>
				<FlashGlitch classList={alias[race] && 'text-[#E8E8E8]'}>{alias[race] ?? race}</FlashGlitch>
			</h2>
			{#each Object.entries(categories) as [category, enemies]}
				<div class="mb-10">
					<h3
						class="vcr glitch-anim-soft mb-6 text-center text-2xl font-bold tracking-widest text-white uppercase"
					>
						{category}
					</h3>
					<div
						class="mx-12 flex flex-wrap justify-between gap-6 grid-cols-4"
					>
						{#each enemies as enemy, index}	
							{@const slug = enemy.Name.replace(/\s+/g, '_')}
							<a
								href={'/enemies/' + slug}
								class="animate-fade-in group relative z-10 m-auto flex flex-col items-center overflow-visible rounded-xl border-4 transition-transform duration-200 {pSO[enemy.Name]
									? pSO[enemy.Name].card
									: 'border-red-500 bg-linear-to-br from-black via-neutral-900 to-red-950 shadow-[0_8px_32px_0_rgba(255,0,0,0.25)]'}
								"
								data-sveltekit-preload-data
								style="animation-delay: {index * 80}ms; width: 240px; height: 390px;"
							>
								<div class="relative h-full w-full overflow-hidden rounded-xl pt-8">
									<!-- Enemy image -->
									<img
										loading="lazy"
										src={imageModule(enemy.Name)}
										alt={enemy.Name}
										class="h-full w-full brightness-95 transition-all duration-200 group-hover:brightness-110 {imageOverrides[enemy.Name] ?? 'object-cover'} origin-center transform-[scale]"
										style="object-position:top;"
										draggable="false"
									/>
									<!-- Category banner -->
									{#if category !== '???'}
										<div
											class="vcr absolute top-3 left-1/2 z-30 -translate-x-1/2 rounded-full border-2 border-white/10 bg-linear-to-r {color[category]} px-4 py-1 text-xs tracking-widest text-white uppercase shadow-sm"
										>
											{category}
										</div>
									{/if}
									<!-- Name banner -->
									<div
										class="absolute bottom-0 left-0 z-10 w-full rounded-b-xl bg-linear-to-t from-black/90 via-black/40 to-transparent px-4 py-3"
									>
										{#if enemy.Name === 'Minotaur'}
											<span class="vcr uppercase text-lg font-bold drop-shadow-xs transition-colors duration-300 relative text-red-600 group-hover:text-white">
												Minotaur
												<span style="position:absolute;left:0;right:0;top:55%;height:2px;background:white;z-index:2;transform:translateY(-50%);pointer-events:none;"></span>
											</span>
										{:else}
											<span
												class="vcr uppercase {pSO[enemy.Name]
													? pSO[enemy.Name].name
													: 'group-hover:text-red-400'} text-lg font-bold drop-shadow-xs transition-colors duration-300"
												>{enemy.Name}</span
											>
										{/if}
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</section>
	{/each}
</div>