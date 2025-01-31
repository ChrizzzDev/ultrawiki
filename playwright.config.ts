import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: 4321
	},

	testDir: 'e2e'
});
