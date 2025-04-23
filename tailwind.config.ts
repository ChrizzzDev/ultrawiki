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
		)
	],
	theme: {
		extend: {},
		fontFamily: {
			'vcr': ['./static/fonts/VCR_OSD_MONO.ttf'],
			'broshkill': ['./static/fonts/BroshKill-Regular.otf']
		}
	},

	plugins: [
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
