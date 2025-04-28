<script lang="ts">
	import type { PageProps } from './$types';
	import type { Level as L } from 'dbt';
	import FlashGlitch from '$lib/components/FlashGlitch.svelte';

	type Level = Pick<L, 'Act' | 'Name' | 'LevelId'>;

	const { data }: PageProps = $props();

	const imageModule = (id: string) => `/icons/levels/${id}.webp`;

	const layers = {
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
		const groupedLevels: Map<string, Map<string, Level[]>> = new Map();

		for (const level of levels) {
			const id = level.LevelId;
			const layer = layers[id.substring(0, 1) as keyof typeof layers];
			const act = level.Act;

			if (!groupedLevels.has(act)) {
				groupedLevels.set(act, new Map());
			}

			const actGroup = groupedLevels.get(act)!;
			if (!actGroup.has(layer)) {
				actGroup.set(layer, []);
			}

			actGroup.get(layer)!.push(level);
		}

		return groupedLevels;
	}

	let groupedLevels = $state<Map<string, Map<string, Level[]>>>(new Map());

	groupedLevels = groupLevels();
</script>

<svelte:head>
	<title>ULTRAWIKI - Levels</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	{#each groupedLevels as [act, layers]}
		<section class="mb-16">
			<h2
				class="vcr glitch layers mb-8 border-b-2 border-red-700 pb-2 text-4xl font-extrabold text-red-600 drop-shadow-2xl"
			>
				<FlashGlitch>{act}</FlashGlitch>
			</h2>
			{#each layers as [layerName, layerLevels]}
				<div class="mb-10">
					<h3
						class="vcr glitch-anim-soft mb-6 text-center text-2xl font-bold tracking-widest text-white uppercase"
					>
						{layerName}
					</h3>
					<div class="mx-12 grid gap-6 justify-between sm:md:grid-cols-3">
						{#each layerLevels as level, index}
							{@const slug = level.Name.replace(/\s+/g, '_')}
							<a
								href="/levels/{slug}"
								class="group animate-fade-in relative z-10 block w-full overflow-hidden rounded-md border-4 border-red-500 bg-black shadow-[4px_4px_0_#ff0000] transition-transform duration-200 hover:scale-[1.03]"
								style="animation-delay: {index * 80}ms"
								data-sveltekit-preload-code="hover"
							>
								<div class="relative">
									<img
										loading="lazy"
										src={imageModule(level.LevelId)}
										alt={level.Name}
										class="h-56 w-full object-cover transition-transform duration-200 group-hover:scale-110"
										draggable="false"
									/>
									<div
										class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
									></div>
									<div class="pointer-events-none absolute inset-0">
										<span
											class="z-10 block h-full w-full rounded-xl opacity-0 group-hover:opacity-100"
										></span>
									</div>
									<div
										class="absolute right-0 bottom-0 left-0 mx-auto flex h-14 w-full items-center justify-center bg-black/60 px-4 py-2 backdrop-blur-xs"
									>
										<span
											class="vcr text-lg font-semibold text-white transition-colors group-hover:text-red-400"
											>{level.Name}</span
										>
									</div>
								</div>
								<div
									class="vcr preset-tonal-surface absolute top-2 right-2 rounded-xs px-2 py-1 text-xs text-white uppercase shadow-sm"
								>
									{layerName}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</section>
	{/each}
</div>
