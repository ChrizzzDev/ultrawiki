import type { Attacks, Enemy_Category, Enemy_Race, Enemy_Weigth, Health } from "dbt";

export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.statusText}`);
  }

  const data: T = await res.json();
  return data;
}

export interface LevelResponse {
  LevelId: string;
  Name: string;
  Act: string;
  Secret?: number[];
  PRank?: number[];
  Challenge?: string;
  Enemies?: { EnemyId: string, Quantity: number }[];
  // biome-ignore lint/suspicious/noExplicitAny: :v
  [field: string]: any;
}

export interface EnemyResponse {
  Name: string;
  Category?: Enemy_Category;
  Race: Enemy_Race;
  Weigth: Enemy_Weigth;
  Health: Health;
  Attacks?: Attacks;
  DamageModifiers?: Attacks;
  DebutId: string;
  SPR?: number;
  FallDamage?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: v:
  [field: string]: any;
}

export type APIResponse<T> = {
  data: T;
}