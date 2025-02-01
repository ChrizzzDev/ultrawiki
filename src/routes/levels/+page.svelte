<script lang="ts">
	import type { PageProps } from './$types';
	import type { Level } from 'dbt';
	import { onMount } from 'svelte';

	// Props
	let { data }: PageProps = $props();

	// Importar imágenes dinámicamente
	const imageModule = async (id: string) =>
		await import(`../../lib/assets/icons/levels/${id}.webp`);

	// Mapeo de capas (layers)
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

	// Agrupar niveles por acto y capa
	async function groupLevelsByAct() {
		const _levels = await data.levels;
		const groupedLevelsByAct: { [key: string]: { [key: string]: Level[] } } = {};

		for (const level of _levels) {
			const id = level.LevelId;
			const layer = layers[id.substring(0, 1)];
			const act = level.Act;

			if (!groupedLevelsByAct[act]) groupedLevelsByAct[act] = {};
			if (!groupedLevelsByAct[act][layer]) groupedLevelsByAct[act][layer] = [];

			groupedLevelsByAct[act][layer].push(level);
		}

		return groupedLevelsByAct;
	}

	// Estado reactivo para los niveles agrupados
	let groupedLevelsByAct = $state<{ [key: string]: { [key: string]: Level[] } }>({});

	// Cargar datos al montar el componente
	onMount(async () => {
		groupedLevelsByAct = await groupLevelsByAct();
	});
</script>

<div class="container mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedLevelsByAct) as [act, layers]}
		<div class="mb-12">
			<!-- Act: Alineado a la izquierda -->
			<h2 class="vcr mb-6 text-left text-3xl font-bold text-red-600">{act}</h2>

			{#each Object.entries(layers) as [layerName, layerLevels]}
				<div class="mb-8">
					<!-- Layer: Alineado al centro -->
					<h3 class="vcr mb-6 text-center text-2xl font-semibold text-white">
						{layerName.toUpperCase()}
					</h3>

					<!-- Levels: 4 por fila, distribuidos equilibradamente -->
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
						{#each layerLevels as level, index}
							{@const slug = level.Name.replace(/\s+/g, '_')}
							<a href="/levels/{slug}" class="block">
								<div
									class="{layerLevels.length === 2 && index === 0 ? 'md:col-start-1' : ''}
											{layerLevels.length === 2 && index === 1 ? 'md:col-start-4' : ''}"
								>
									<div
										class="variant-ghost-surface mx-auto w-full max-w-[280px] rounded-xl bg-gray-700 p-4 transition-colors hover:bg-neutral-800"
									>
										{#await imageModule(level.LevelId)}
											<div class="h-56 w-full animate-pulse rounded-lg bg-neutral-800"></div>
										{:then { default: src }}
											<img
												{src}
												alt={level.Name}
												class="mb-4 h-56 w-full rounded-lg object-cover"
												draggable="false"
											/>
										{:catch}
											<div class="text-center text-red-500">Error loading image</div>
										{/await}
										<span class="vcr block text-center text-lg font-medium text-white transition-colors hover:text-red-500">
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
