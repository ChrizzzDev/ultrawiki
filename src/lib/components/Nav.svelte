<script lang="ts">
	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<nav
	class="preset-glass-neutral bg-black/80 fixed left-1/2 top-4 z-50 w-[80%] md:w-[60%] -translate-x-1/2 rounded-lg border border-white/20 shadow-[0_4px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-lg"
>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse hover:scale-105 transition-transform duration-100 glitch layers">
			<img src='/favicon.ico' class="h-8" alt="Ultrawiki Logo" draggable="false"/>
			<span class="vcr whitespace-nowrap text-2xl font-semibold text-red-600 drop-shadow">ULTRAWIKI</span>
		</a>
		<div class="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
			<button
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-700 md:hidden"
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
				class="bg-transparent mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
			>
				<li>
					<a
						href="/levels"
						class="block rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:hover:text-red-500 hover:text-red-600 transition"
						>Levels</a
					>
				</li>
				<li>
					<a
						href="/enemies"
						class="block rounded px-3 py-2 text-white hover:bg-white/10 md:p-0 md:hover:bg-transparent md:hover:text-red-500 transition"
						data-sveltekit-preload-data
						>Enemies</a
					>
				</li>
				<li>
					<a
						href="/weapons"
						class="block rounded px-3 py-2 text-white hover:bg-white/10 md:p-0 md:hover:bg-transparent md:hover:text-red-500 transition"
						>Weapons</a
					>
				</li>
				<li>
					<a
						href="/terminal"
						class="block rounded px-3 py-2 text-white hover:bg-white/10 md:p-0 md:hover:bg-transparent md:hover:text-red-500 transition"
						>><span class="ml-2"></span>terminal <span class="blink">_</span></a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
