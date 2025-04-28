import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		paths: {
			base: ''
		},
		adapter: adapter(),
		alias: {
			db: './src/lib/server/database.ts',
			dbt: './prisma/index.ts'
		}
	},
	extensions: ['.svelte', '.svx'],
	compilerOptions: {
		customElement: true
	}
};
export default config;
