import type { PageServerLoad } from './$types';
import type { APIResponse, LevelResponse } from '$lib';

export const prerender = true;
export const ssr = false;

export const load: PageServerLoad = async ({ fetch, params, url }) => {
	const slug = params.slug.replaceAll('_', ' ');
	const query = new URLSearchParams(url.searchParams).toString();
	const res = await fetch(`/api/v1/levels/${slug}?enemies${query ? `&${query}` : ''}`);

	if (!res.ok) {
		throw new Error('Failed to load level');
	}

	const response: APIResponse<LevelResponse[]> = await res.json();

	return { rows: response.data };
};