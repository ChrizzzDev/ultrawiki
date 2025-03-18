<script lang="ts">
	import type { PageProps } from './$types';
	import type { Level } from 'dbt';
	import { onMount } from 'svelte';

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

	onMount(() => {
		groupedLevels = groupLevels();
	});
</script>

<div class="container mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedLevels) as [act, layers]}
		<div class="mb-12">
			<h2 class="vcr mb-6 text-left text-3xl font-bold text-red-600">{act}</h2>
			{#each Object.entries(layers) as [layerName, layerLevels]}
				<div class="mb-8">
					<h3 class="vcr mb-6 text-center text-2xl font-semibold text-white">
						{layerName.toUpperCase()}
					</h3>
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
						{#each layerLevels as level, index}
							{@const slug = level.Name.replace(/\s+/g, '_')}
							<a 
							href="/levels/{slug}"
							class="block" 
							data-sveltekit-preload-code
							data-sveltekit-preload-data
							>
								<div
									class="{layerLevels.length === 2 && index === 0 ? 'md:col-start-1' : ''}
											{layerLevels.length === 2 && index === 1 ? 'md:col-start-4' : ''}"
								>
									<div
										class="variant-ghost mx-auto w-full max-w-[280px] rounded-xl bg-primary p-4 transition-colors hover:bg-neutral-800 h-80 flex-col"
									>
										{#await imageModule(level.LevelId)}
											<div class="h-56 w-full animate-pulse rounded-lg bg-neutral-800"></div>
										{:then { default: src }}
											<img
												{src}
												alt={level.Name}
												class="mb-4 h-56 w-full rounded-lg object-cover transform-gpu sm:transform-none"
												draggable="false"
											/>
										{:catch}
											<div class="text-center text-red-500">Error loading image</div>
										{/await}
										<span class="vcr block text-center justify-center text-lg font-medium text-white transition-colors hover:text-red-500">
											{level.Name}
										</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
