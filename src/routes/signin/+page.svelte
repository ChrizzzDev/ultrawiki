<script lang="ts">
  // import { focusTrap } from '@skeletonlabs/skeleton';
  import { signIn } from '@auth/sveltekit/client';

  let email = $state('');
  let password = $state('');
  let isFocused = true;

  const isEmailValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = () => {
    return password.length >= 8 && password.length <= 32;
  }

  const callbackUrl = '/';
</script>
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

<main class="img-bg">
  <div class="overlay"></div>
  <div 
    class="container flex justify-center items-center h-[100vh]"
  >
    <form 
      class="form-container bg-surface-700 variant-glass-surface max-w-400 p-8 rounded-xl shadow-[0_4px_20px] shadow-red-950" 
    >
      <h1 class="text-center mb-4 vcr text-5xl">SIGN IN</h1>
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
          >
        </label>
      </div>
      <div class="flex mt-4 justify-center items-center">
        <button 
          type="button"
          class="btn variant-ghost-primary transition-transform duration-200 ease-in-out hover:scale-110 hover:variant-filled-primary"
          disabled={!isEmailValid() || !isPasswordValid()}
          onclick={() => signIn('credentials', { email, password, callbackUrl })}
        >Sign In</button>
      </div>
      <div class="text-center  mt-4">
        Not registered yet? <a href="/signup" class="vcr text-red-600">SIGN UP</a>
      </div>
      <div class="flex items-center mt-3">
        <div class="border-t border-stone-800 flex-grow"></div>
        <div class="px-3 text-stone-600">OR</div>
        <div class="border-t border-stone-800 flex-grow"></div>
      </div>
      <button
        type="button"
        onclick={() => signIn('google', { callbackUrl })}
        class="btn bg-neutral-300 p-2 mt-4 w-full text-black text-sm*2 h-10"
        aria-label="Sign in with Google"
      >
      Sign In with <iconify-icon icon="logos:google" class="mt-1 ml-1"></iconify-icon>
    </button>
    </form>
  </div>
</main>