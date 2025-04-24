<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let counter = $state(5);

	if (page.status === 404) {
		$effect(() => {
			const id = setInterval(() => {
				if (--counter === 0) goto('/');
			}, 1000);

			return () => {
				clearInterval(id);
			};
		});
	}
</script>

<div class="mt-[-50px] flex h-screen items-center justify-center">
	<div class="max-w-full shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
		<h1 class="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
			{page.status}
		</h1>
		<p class="mt-6 text-lg leading-8 text-gray-300">
			{page.error?.message}
		</p>
		<div class="mt-5 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
				rel="noreferrer">Go Home</a
			>
		</div>
	</div>
</div>
