<script lang="ts">
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import FlashGlitch from '$lib/components/FlashGlitch.svelte';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';
	// import { reveal } from 'svelte-reveal';

	const { data }: PageProps = $props();

	const rows = data.rows;
	const enemies = $state(
		rows
			.filter((row) => row.Enemies)
			.flatMap((row) => row.Enemies ?? [])
	);
	const level = rows[0];

	const imageModule = (id: string) => `/icons/levels/${id}.webp`;

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

	const sp: { [key: number]: string } = {
		0: 'Soul Orb',
		1: 'Red Soul Orb',
		2: 'Gold Soul Orb'
	};

	function parseSecrets(data: number[]): string[] {
		if (!data) return [];

		const result: string[] = [];

		for (const secret of data) {
			result.push(sp[secret]);
		}

		return result;
	}

	function parsePRank(data: number[]): Partial<PRank> {
		if (!data) return {};

		return {
			time: `${data[0]}s`,
			enemies: data[1],
			style: data[2]
		};
	}

	type PRank = { time: string; enemies: number; style: number };

	const layerName = layers[level.LevelId.substring(0, 1)] ?? 'Unknown';
	const secrets = parseSecrets(level.Secret ?? []);
	const prank = parsePRank(level.PRank ?? []);

	// biome-ignore lint/style/useConst: <explanation>
	let size = $state(5);
	// biome-ignore lint/style/useConst: <explanation>
	let page = $state(1);
	const slicedData = $derived((s: typeof enemies) => s.slice((page - 1) * size, page * size));
</script>

<svelte:head>
	<title>ULTRAKILL - {level.LevelId}: {level.Name}</title>
</svelte:head>

<div class="z-20 mx-auto max-w-3xl px-4 py-10">
	<div
		class="relative overflow-hidden rounded-2xl border-4 border-red-500 bg-linear-to-br from-neutral-900 to-neutral-800 shadow-2xl"
	>
		<img
			src={imageModule(level.LevelId!)}
			alt={level.Name}
			class="h-72 w-full object-cover object-center"
			draggable="false"
		/>
		<div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
		<div
			class="vcr absolute top-4 left-4 rounded-xl border-2 border-red-500 bg-black/70 px-4 py-2 text-lg tracking-widest text-white uppercase shadow-lg"
		>
			{layerName}
		</div>
	</div>
	<div class="mt-8 text-center">
		<h2 class="vcr glitch layers -mb-1 text-4xl font-extrabold text-red-600">
			<FlashGlitch>{level.Name}</FlashGlitch>
		</h2>
		<p class="text-tertiary-500 mb-4 text-lg italic">
			ID: {level.LevelId}
		</p>
		<!-- Secrets -->
		{#if secrets.length}
			<!-- <div
				use:reveal={{ duration: 500, preset: 'fly', y: 80 }}
				class="vcr mt-4 p-4 bg-slate-950/50 rounded-md shadow-md border-2 border-blue-950 sr__hide"
			> -->
			<div
				class="vcr mt-4 p-4 bg-slate-950/50 rounded-md shadow-md border-2 border-blue-950 sr__hide"
			>
				<span class="vcr text-yellow-400 block mb-2">SECRETS:</span>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
					{#each secrets as secret}
						<div class="flex flex-col items-center text-center">
							<img 
								src="/icons/others/{secret}.webp" 
								alt={secret}
								class="w-12 h-12 object-contain"
							/>
							<span class="mt-1 text-white text-sm">{secret}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- P-Rank -->
		{#if level.PRank?.length}
			<!-- <div use:reveal={{ duration: 500, preset: 'fly', y: 80 }} class="vcr mt-4 grid grid-cols-3 gap-4 text-sm text-white">-->
			<div class="vcr mt-4 grid grid-cols-3 gap-4 text-sm text-white">
				<div
					class="flex flex-col items-center rounded-lg border border-pink-400 bg-black/50 p-2 shadow-md"
				>
					<span class="text-pink-300">TIME</span>
					<span>{prank.time}</span>
				</div>
				<div
					class="flex flex-col items-center rounded-lg border border-pink-400 bg-black/50 p-2 shadow-md"
				>
					<span class="text-pink-300">ENEMIES</span>
					<span>{prank.enemies}</span>
				</div>
				<div
					class="flex flex-col items-center rounded-lg border border-pink-400 bg-black/50 p-2 shadow-md"
				>
					<span class="text-pink-300">STYLE</span>
					<span>{prank.style}</span>
				</div>
			</div>
		{/if}

		<!-- Challenge -->
		{#if level.Challenge}
			<!-- <div
				use:reveal={{ duration: 500, preset: 'fly', y: 80 }}
				class="border-success-400 bg-success-900/20 mt-4 rounded-xl border-2 p-4 text-white shadow-md"
			> -->
			<div
				class="border-success-400 bg-success-900/20 mt-4 rounded-xl border-2 p-4 text-white shadow-md"
			>
				<div class="vcr flex items-center space-x-2">
					<Icon icon="pepicons-print:swords" class="text-blue-400" />
					<span class="tracking-wider text-blue-200 uppercase">Challenge:</span>
				</div>
				<p class="mt-2 text-blue-100 italic">{level.Challenge}</p>
			</div>
		{/if}
	</div>
	{#if enemies.length}
		<section class="mt-6 space-y-4">
			<div class="table-wrap md:overflow-x-hidden">
				<section class="mt-10">
					<table class="w-full border-separate border-spacing-y-4 text-left">
						<thead class="vcr text-xs tracking-widest text-red-500 uppercase">
							<tr>
								<th class="w-20">Enemy</th>
								<th class="pl-2">Name</th>
								<th class="text-right">Quantity</th>
								<th class="w-28"></th>
							</tr>
						</thead>
						<tbody
							class="[&>tr]:transition-transform [&>tr]:duration-200 [&>tr]:hover:scale-[1.03]"
						>
							{#each slicedData(enemies) as enemy}
								<tr class="overflow-hidden rounded-2xl bg-black/20 shadow-md backdrop-blur-md">
									<td class="p-2">
										<img
											src={`/icons/enemies/${enemy.EnemyId}.webp`}
											alt={enemy.EnemyId}
											class="h-16 w-16 object-contain"
											draggable="false"
										/>
									</td>
									<td class="vcr pr-4 pl-2 tracking-wide text-white uppercase">
										{enemy.EnemyId}
									</td>
									<td class="broshkill pr-4 text-right text-4xl text-white">{enemy.Quantity}</td>
									<td class="pr-4 text-right">
										<a
											href="/enemies/{enemy.EnemyId}"
											class="vcr btn rounded-md border border-red-500 px-3 py-1 text-xs tracking-wider text-red-400 uppercase transition hover:bg-red-700/30 hover:text-white"
										>
											View →
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</section>
			</div>
			<footer class="flex justify-between">
				<select
					name="size"
					class="select max-h-max max-w-[150px] bg-black align-middle"
					onchange={(e) => (size = Number(e.currentTarget.value))}
				>
					{#each [1, 2, 3, 5, 10] as v}
						<option value={v}>{v} {v > 1 ? 'enemies' : 'enemy'}</option>
					{/each}
					<option value={rows.length}>Show all</option>
				</select>
				
				<Pagination
					data={enemies}
					{page}
					onPageChange={(e) => (page = e.page)}
					pageSize={size}
					onPageSizeChange={(e) => (size = e.pageSize)}
					siblingCount={4}
					classes="align-middle"
				>
					{#snippet labelEllipsis()}<Icon icon="lucide:ellipsis" />{/snippet}
					{#snippet labelNext()}<Icon icon="lucide:arrow-right" />{/snippet}
					{#snippet labelPrevious()}<Icon icon="lucide:arrow-left" />{/snippet}
					{#snippet labelFirst()}<Icon icon="lucide:chevron-first" />{/snippet}
					{#snippet labelLast()}<Icon icon="lucide:chevron-last" />{/snippet}
				</Pagination>
			</footer>
		</section>
	{/if}
	<div class="mt-10 text-center">
		<p class="text-gray-400 italic">Soon: weapons and secrets about this level...</p>
	</div>
</div>