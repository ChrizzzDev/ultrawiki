<svelte:head>
	<title>{data.Name}</title>
</svelte:head>

<script lang="ts">
	import type { PageProps } from './$types';
	import Wip from '$lib/components/WIP.svelte';

	let { data }: PageProps = $props();
</script>

<Wip />