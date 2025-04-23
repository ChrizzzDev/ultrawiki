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
	<div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-red-700 bg-gradient-to-br from-neutral-900 to-neutral-800">
		<img
			src={imageModule(data.LevelId)}
			alt={data.Name}
			class="w-full h-72 object-cover object-center"
			draggable="false"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
		<div class="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-xl border-2 border-red-600 vcr text-white text-lg shadow-lg uppercase tracking-widest">{layerName}</div>
		<div class="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-xl border-2 border-red-600 vcr text-white text-lg shadow-lg uppercase tracking-widest">{data.Act}</div>
	</div>
	<div class="mt-8 text-center">
		<h1 class="vcr text-4xl font-extrabold text-red-600 drop-shadow-lg glitch-anim-soft mb-2">{data.Name}</h1>
		<p class="text-lg text-gray-200 mb-4">ID: <span class="font-mono text-white">{data.LevelId}</span></p>
		{#if data.Secret}
			<div class="mb-2">
				<span class="vcr text-yellow-400">SECRETS:</span>
				<span class="text-white ml-2">{data.Secret}</span>
			</div>
		{/if}
		{#if data.PRank}
			<div class="mb-2">
				<span class="vcr text-pink-400">P-RANK:</span>
				<span class="text-white ml-2">{data.PRank}</span>
			</div>
		{/if}
		{#if data.Challenge}
			<div class="mb-2">
				<span class="vcr text-blue-400">CHALLENGE:</span>
				<span class="text-white ml-2">{data.Challenge}</span>
			</div>
		{/if}
	</div>
	<div class="mt-10 text-center">
		<p class="italic text-gray-400">Soon: enemies, weapons and secrets about this level...</p>
	</div>
</div>