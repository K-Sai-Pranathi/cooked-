import { HallOfShameEntry } from '../types';

export const INITIAL_SHAME_ENTRIES: HallOfShameEntry[] = [];

const LOCAL_STORAGE_KEY = 'am_i_cooked_user_sins_v2';

export function getShameEntries(): HallOfShameEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveShameEntries(entries: HallOfShameEntry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}
