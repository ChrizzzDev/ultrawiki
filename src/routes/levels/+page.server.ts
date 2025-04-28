import type { APIResponse, LevelResponse } from '$lib';
import { fetchAPI } from '$lib';
import type { PageServerLoad } from './$types';

export const ssr = false;

export const load: PageServerLoad = async ({ url }) => {
	const query = new URLSearchParams(url.searchParams).toString();
	const res = await fetchAPI<APIResponse<LevelResponse[]>>(`/api/v1/levels?fields=Name,Act,LevelId${query? `?${query}` : ''}`);

	return { levels: res.data };
};
