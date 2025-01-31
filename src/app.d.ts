// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about the interfaces
import type { User, Session } from 'dbt';
import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
