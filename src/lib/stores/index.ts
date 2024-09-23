import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const channelsLength = writable<number | undefined>(0);
export const currentChannel = writable<number | undefined>(-1);
export const currentChannelChange = writable(false);
export const innerWidth = writable(0);
export const loggedUser = writable<User | undefined>();
export const toggleClass = writable('-translate-x-full');
