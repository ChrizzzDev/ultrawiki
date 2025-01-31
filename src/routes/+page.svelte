<script lang="ts">
	import { page } from '$app/state';
	const session = page.data.session;
</script>

<!-- Hero Section -->
<div class="mt-[-50px] flex h-screen items-center justify-center">
	<div class="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
		<h1 class="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
			Welcome to
			<span class="vcr text-red-600">ULTRAWIKI</span><span class="text-red-500"
				>{session ? `, ${session.user?.name}` : ''}</span
			>
		</h1>
		<p class="mt-6 text-lg leading-8 text-gray-300">
			This wiki is dedicated to <strong class="text-red-500">ULTRAKILL</strong>. Here you'll find
			information about enemies, weapons, levels, bosses and more!
		</p>
		<div class="mt-5 flex items-center justify-center gap-x-6">
			<a
				href="/levels"
				class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
				rel="noreferrer">Discover  →</a
			>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="text-center">
	<section>
		<big>
			<big>
				<div
					style="font-size: 105%; border: 5px solid white;"
					class="ml-[30%] mr-[30%] flex rounded-md bg-[rgba(0,0,0,0.7);] p-[0.4em_0.6em] text-left"
				>
					<span class="m-auto">
						<div class="vcr text-center text-[red]">
							MANKIND IS DEAD <br />
							BLOOD IS FUEL <br />
							HELL IS FULL
						</div>
					</span>
				</div>
			</big>
		</big>
	</section>
</main>
