import { writable, type Writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export const toggleClass = writable('-translate-x-full');
export const innerWidth = writable(0);
export const loggedUser: Writable<User|undefined> = writable();
