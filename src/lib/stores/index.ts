import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export const toggleClass = writable('-translate-x-full');
export const innerWidth = writable(0);
export const length = writable<number | undefined>(0);
export const loggedUser = writable<User | undefined>();
export const currentChannel = writable<number | undefined>(-1);

