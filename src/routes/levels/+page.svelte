<script lang="ts">
	import type { PageProps } from './$types';
	import type { Level as L } from 'dbt';
	type Level = Pick<L, 'Act' | 'Name' | 'LevelId'>;

	let { data }: PageProps = $props();

	const imageModule = async (id: string) =>
		await import(`../../lib/assets/icons/levels/${id}.webp`);

	const layers: { [key: string]: string } = {
		'0': 'Overture',
		'1': 'Limbo',
		'2': 'Lust',
		'3': 'Gluttony',
		'4': 'Greed',
		'5': 'Wrath',
		'6': 'Heresy',
		'7': 'Violence'
	};

	function groupLevels() {
		const levels = data.levels;
		const groupedLevels: { [key: string]: { [key: string]: Level[] } } = {};

		for (const level of levels) {
			const id = level.LevelId;
			const layer = layers[id.substring(0, 1)];
			const act = level.Act;

			if (!groupedLevels[act]) groupedLevels[act] = {};
			if (!groupedLevels[act][layer]) groupedLevels[act][layer] = [];

			groupedLevels[act][layer].push(level);
		}

		return groupedLevels;
	}

	let groupedLevels = $state<{ [key: string]: { [key: string]: Level[] } }>({});

	groupedLevels = groupLevels();
</script>

<svelte:head>
	<title>ULTRAWIKI - Levels</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedLevels) as [act, layers]}
		<section class="mb-16">
			<h2 class="vcr text-4xl font-extrabold text-red-600 drop-shadow-lg mb-8 border-b-2 border-red-700 pb-2 glitch-anim">{act}</h2>
			{#each Object.entries(layers) as [layerName, layerLevels]}
				<div class="mb-10">
					<h3 class="vcr text-2xl font-bold text-white tracking-widest mb-6 uppercase text-center glitch-anim-soft">{layerName}</h3>
					<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
						{#each layerLevels as level, index}
							{@const slug = level.Name.replace(/\s+/g, '_')}
							<a
								href="/levels/{slug}"
								class="group relative block rounded-md overflow-hidden border-4 border-red-500 bg-black hover:scale-[1.03] transition-transform duration-150 animate-fade-in shadow-[4px_4px_0_#ff0000]"
								data-sveltekit-preload-code
								data-sveltekit-preload-data
								style="animation-delay: {index * 80}ms"
							>
								<div class="relative">
									{#await imageModule(level.LevelId)}
										<div class="h-56 w-full animate-pulse bg-neutral-800"></div>
									{:then { default: src }}
										<img
											loading="lazy"
											{src}
											alt={level.Name}
											class="h-56 w-full object-cover transition-transform duration-200 group-hover:scale-110"
											draggable="false"
										/>
									{:catch}
										<div class="h-56 w-full flex items-center justify-center text-red-500 bg-neutral-900">Error loading image</div>
									{/await}
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
									<div class="absolute inset-0 pointer-events-none">
										<span class="block w-full h-full rounded-xl opacity-0 group-hover:opacity-100 z-10"></span>
									</div>
									<div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black/60 backdrop-blur-sm flex items-center justify-center h-14 w-full mx-auto">
										<span class="vcr text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{level.Name}</span>
									</div>
								</div>
								<div class="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded shadow vcr variant-glass-surface uppercase">{layerName}</div>
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
</style>