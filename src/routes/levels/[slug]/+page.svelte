<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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

	const layerName = layers[data.LevelId.substring(0, 1)] ?? 'Unknown';
</script>

<svelte:head>
	<title>{data.LevelId} - {data.Name}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-10">
	<div
		class="relative overflow-hidden rounded-2xl border-4 border-red-700 bg-linear-to-br from-neutral-900 to-neutral-800 shadow-2xl"
	>
		<img
			src={imageModule(data.LevelId)}
			alt={data.Name}
			class="h-72 w-full object-cover object-center"
			draggable="false"
		/>
		<div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
		<div
			class="vcr absolute top-4 left-4 rounded-xl border-2 border-red-600 bg-black/70 px-4 py-2 text-lg tracking-widest text-white uppercase shadow-lg"
		>
			{layerName}
		</div>
		<div
			class="vcr absolute top-4 right-4 rounded-xl border-2 border-red-600 bg-black/70 px-4 py-2 text-lg tracking-widest text-white uppercase shadow-lg"
		>
			{data.Act}
		</div>
	</div>
	<div class="mt-8 text-center">
		<h1 class="vcr glitch-anim-soft mb-2 text-4xl font-extrabold text-red drop-shadow-lg">
			{data.Name}
		</h1>
		<p class="mb-4 text-lg text-gray-200">
			ID: <span class="font-mono text-white">{data.LevelId}</span>
		</p>
		{#if data.Secret}
			<div class="mb-2">
				<span class="vcr text-yellow-400">SECRETS:</span>
				<span class="ml-2 text-white">{data.Secret}</span>
			</div>
		{/if}
		{#if data.PRank}
			<div class="mb-2">
				<span class="vcr text-pink-400">P-RANK:</span>
				<span class="ml-2 text-white">{data.PRank}</span>
			</div>
		{/if}
		{#if data.Challenge}
			<div class="mb-2">
				<span class="vcr text-blue-400">CHALLENGE:</span>
				<span class="ml-2 text-white">{data.Challenge}</span>
			</div>
		{/if}
	</div>
	<div class="mt-10 text-center">
		<p class="text-gray-400 italic">Soon: enemies, weapons and secrets about this level...</p>
	</div>
</div>
