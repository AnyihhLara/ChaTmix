import type { Channel } from '$lib/types';
import { fetchApi } from '$lib/utils';

export async function createChannel(ownerUserId: string, channelData: Channel): Promise<unknown> {
	return await fetchApi(`/api/channels/owner/${ownerUserId}`, 'POST', channelData);
}
export async function getChannel(channelId: number): Promise<Channel> {
	return await fetchApi(`/api/channels/${channelId}`, 'GET');
}
export async function updateChannel(ownerUserId: string, channelId: number, channelData: Channel) {
	return await fetchApi(`/api/channels/owner/${ownerUserId}/${channelId}`, 'PUT', channelData);
}
export async function deleteChannel(ownerUserId: string, channelId: number) {
	return await fetchApi(`/api/channels/owner/${ownerUserId}/${channelId}`, 'DELETE');
}

export async function getAllChannels(): Promise<Channel[]> {
	return await fetchApi(`/api/channels}`, 'GET');
}
export async function deleteAllChannels() {
	return await fetchApi(`/api/channels}`, 'DELETE');
}

export async function getAllUserChannels(ownerUserId: string): Promise<Channel[]> {
	return await fetchApi(`/api/channels/owner/${ownerUserId}`, 'GET');
}
export async function deleteAllUserChannels(ownerUserId: string) {
	return await fetchApi(`/api/channels/owner/${ownerUserId}`, 'DELETE');
}
