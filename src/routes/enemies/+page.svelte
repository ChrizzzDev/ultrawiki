<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import type { Enemy } from 'dbt';
	import WIP from '$lib/components/WIP.svelte'

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

	onMount(() => {
		groupedEnemies = groupEnemies();
	});
</script>
<WIP />

<!-- 
<div class="container mx-auto max-w-7xl px-4 py-8">
	{#each Object.entries(groupedEnemies) as [act, race]}
		<div
			class="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 py-10"
		>
			{#each Object.entries(race) as [raceName, raceEnemies]}
				{#each Object.entries(raceEnemies) as [s, enemy]}
					<div class="card h-64 w-40 shrink-0 snap-center py-20 text-center md:w-80">
						{#await imageModule(enemy.Name)}
							<div class="h-32 w-full animate-pulse rounded-lg bg-neutral-800"></div>
						{:then { default: src }}
							<img
								{src}
								alt={enemy.Name}
								class="mb-4 h-32 w-full transform-gpu rounded-xl object-cover sm:transform-none"
								draggable="false"
							/>
						{:catch}
							<div class="text-center text-red-500">Error loading image</div>
						{/await}
					</div>
				{/each}
			{/each}
		</div>
	{/each}
</div> -->
