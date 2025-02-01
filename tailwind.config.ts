import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

import { skeleton } from '@skeletonlabs/tw-plugin';

import { join } from 'path';
import { type Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,ts,svelte}'
		),
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {},
		fontFamily: {
			'vcr': ['./src/lib/assets/fonts/VCR_OSD_MONO.ttf'],
			'broshkill': ['./src/lib/assets/fonts/BroshKill-Regular.otf']
		}
	},

	plugins: [
		require('flowbite/plugin'),
		typography, 
		forms, 
		skeleton({
			themes: {
				preset: [{
					name: 'crimson', enhancements: true
				}]
			}
		})
	]
} satisfies Config;
