<script lang="ts">
	import Icon from '@iconify/svelte';
	
	let email = $state('');
	let password = $state('');
  let confirmPassword = $state('');
  let passwordMatch = $derived(password === confirmPassword);

	const isEmailValid = () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const isPasswordValid = () => {
		return password.length >= 8 && password.length <= 32;
	};
</script>

<main class="img-bg">
	<div class="overlay"></div>
	<div class="container flex h-[100vh] items-center justify-center">
		<form
			class="form-container max-w-400 variant-glass-surface rounded-xl bg-surface-700 p-8 shadow-[0_4px_20px] shadow-red-950"
			method="post"
			action="?/login"
		>
			<h1 class="vcr mb-4 text-center text-5xl">SIGN UP</h1>
			<div class="mt-4">
				<label for="email" class="label">
					<span class="vcr text-[20px]">Email</span>
				</label>
				<input
					class="input static"
					title="Email"
					type="email"
					id="email"
					placeholder="example@domain.com"
					autocomplete="email"
					bind:value={email}
				/>
			</div>
			<div class="mt-4">
				<label for="password" class="label">
					<span class="vcr text-[20px]">Password</span>
					<input
						class="input"
						title="Password"
						type="password"
						id="password"
						placeholder="********"
						autocomplete="current-password"
						bind:value={password}
					/>
				</label>
			</div>
      <div class="mt-4">
				<label for="repeat_password" class="label">
					<span class="vcr text-[20px]">Repeat password</span>
					<input
						class="input"
						title="Repeat password"
						type="password"
						id="repeat_password"
						placeholder="********"
						autocomplete="current-password"
						bind:value={confirmPassword}
					/>
				</label>
			</div>
			<div class="mt-4 flex items-center justify-center">
				<button
					type="submit"
					class="variant-ghost-primary btn transition-transform duration-200 ease-in-out hover:variant-filled-primary hover:scale-110"
					disabled={!isEmailValid() || !isPasswordValid() || !passwordMatch}>Sign Up</button
				>
			</div>
			<div class="mt-4 text-center">
				Already have an account? <a href="/login" class="vcr text-red-600">SIGN IN</a>
			</div>
			<div class="mt-3 flex items-center">
				<div class="flex-grow border-t border-stone-800"></div>
				<div class="px-3 text-stone-600">OR</div>
				<div class="flex-grow border-t border-stone-800"></div>
			</div>
			<a
				type="button"
				class="text-sm*2 btn mt-4 h-10 w-full bg-neutral-300 p-2 text-black"
				aria-label="Sign in with Google"
				href="/login/google"
			>
				Sign In with <Icon icon="logos:google" class="ml-1 mt-1"></Icon>
			</a>
		</form>
	</div>
</main>

<style>
	.img-bg {
		background-image: url('/src/lib/assets/background.png');
		background-size: cover;
		background-position: center;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	input {
		border-radius: 0.5rem;
		padding: 0.5rem;
		width: 100%;
	}

	.btn {
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
</style>
