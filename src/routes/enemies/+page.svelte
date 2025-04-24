<script lang="ts">
	import type { PageProps } from './$types';
	import type { Enemy } from 'dbt';

	let { data }: PageProps = $props();

	let color: { [key: string]: string } = {
		Lesser: 'bg-linear-to-r from-orange-900/80 via-orange-700/80 to-orange-900/80',
		Greater: 'bg-linear-to-r from-yellow-900/80 via-yellow-700/80 to-yellow-900/80',
		Supreme: 'bg-linear-to-r from-slate-900/80 via-slate-700/80 to-slate-900/80'
	};

	let imageScaleOverrides: { [key: string]: string } = {
		Drone: 'scale-[0.85]'
	};

	let imageSizeOverrides: string[] = Object.keys(imageScaleOverrides);

	const imageModule = (name: string) => `/icons/enemies/${name}.webp`;

	function groupEnemies() {
		const enemies = data.enemies;

		const orderedRaces = ['Husk', 'Machine', 'Demon', 'Angel', 'Unknown', 'Prime Soul'];
		const orderedCategories = ['Lesser', 'Greater', 'Supreme'];

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
</script>

<svelte:head>
	<title>ULTRAWIKI - Enemies</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedEnemies) as [race, categories]}
		<section class="mb-16">
			<h2
				class="vcr glitch layers mb-8 border-b-2 border-red-700 pb-2 text-4xl font-extrabold text-red-600 drop-shadow-2xl"
			>
				<span>{race}</span>
			</h2>
			{#each Object.entries(categories) as [category, enemies]}
				<div class="mb-10">
					<h3
						class="vcr glitch-anim-soft mb-6 text-center text-2xl font-bold tracking-widest text-white uppercase"
					>
						{category}
					</h3>
					<div
						class="mx-12 flex justify-between gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
					>
						{#each enemies as enemy, index}
							{@const slug = enemy.Name.replace(/\s+/g, '_')}
							<a
								href={'/enemies/' + slug}
								class="animate-fade-in group relative m-auto flex flex-col items-center overflow-visible rounded-xl border-4 border-red-500 bg-linear-to-br from-black via-neutral-900 to-red-950 shadow-[0_8px_32px_0_rgba(255,0,0,0.25)] transition-transform duration-200 z-10"
								data-sveltekit-preload-data
								style="animation-delay: {index * 80}ms; width: 230px; height: 390px;"
							>
								<div class="relative h-full w-full overflow-hidden rounded-xl pt-8">
									<!-- 
										Object-contain/Object-cover can be also fixed using imageScaleOverrides due to obj[key] gives undefined
										if the key is not found, and undefined is falsy.
									-->
									<img
										loading="lazy"
										src={imageModule(enemy.Name)}
										alt={enemy.Name}
										class="h-full w-full brightness-95 transition-all duration-200 group-hover:brightness-110 {imageScaleOverrides[
											enemy.Name
										]} {imageSizeOverrides.includes(enemy.Name)
											? 'object-contain'
											: 'object-cover'} origin-center transform-[scale]"
										style="object-position:top;"
										draggable="false"
									/>
									<!-- Category banner -->
									<div
										class="vcr absolute top-3 left-1/2 z-30 -translate-x-1/2 rounded-full border-2 border-white/10 bg-linear-to-r {color[
											category
										]} px-4 py-1 text-xs tracking-widest text-white uppercase shadow-sm"
									>
										{category}
									</div>
									<!-- Name banner -->
									<div
										class="absolute bottom-0 left-0 z-10 w-full rounded-b-xl bg-linear-to-t from-black/90 via-black/40 to-transparent px-4 py-3"
									>
										<span
											class="vcr text-lg font-bold text-white drop-shadow-xs transition-colors group-hover:text-red-400"
											>{enemy.Name}</span
										>
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
