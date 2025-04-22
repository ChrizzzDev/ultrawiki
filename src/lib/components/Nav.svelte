<script lang="ts">
	import Ico from '$lib/assets/favicon.ico';
	
	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<nav
	class="variant-glass fixed left-1/2 top-4 z-10 w-[70%] md:w-[50%] -translate-x-1/2 rounded-lg border-transparent"
>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src={Ico} class="h-8" alt="Ultrawiki Logo" draggable="false"/>
			<span class="vcr self-center whitespace-nowrap text-2xl font-semibold text-red-500"
				>ULTRAWIKI</span
			>
		</a>
		<div class="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
			<button
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-400 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
				aria-controls="navbar-user"
				aria-expanded="false"
				onclick={toggleMobileMenu}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-5 w-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
		</div>
		<div
			class={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}
			id="navbar-user"
		>
			<ul
				class="bg-primary md:bg-primary mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
			>
				<li>
					<a
						href="/"
						class="block rounded px-3 py-2 text-gray-400 md:bg-transparent md:p-0 md:hover:text-red-500"
						aria-current="page">Home</a
					>
				</li>
				<li>
					<a
						href="/levels"
						class="block rounded px-3 py-2 text-gray-400 hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-red-500"
						data-sveltekit-preload-code
						>Levels</a
					>
				</li>
				<li>
					<a
						href="/enemies"
						class="block rounded px-3 py-2 text-gray-400 hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-red-500"
						>Enemies</a
					>
				</li>
				<li>
					<a
						href="/weapons"
						class="block rounded px-3 py-2 text-gray-400 hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-red-500"
						>Weapons</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>