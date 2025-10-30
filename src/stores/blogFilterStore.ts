import { atom } from 'nanostores';

// Atom for the current search query
export const searchQueryAtom = atom<string>('');

// Atom for the currently selected tag
export const selectedTagAtom = atom<string>('');

// Atom for the list of post IDs that match the current filters
export const filteredPostIdsAtom = atom<Array<string>>([]);

// Optional: an atom to know if the filters have been initialized/applied for the first time.
// This can help the Astro script know when to act for the first time.
export const filtersInitializedAtom = atom<boolean>(false);
