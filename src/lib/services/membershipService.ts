import { fetchApi } from '$lib/utils';

export async function createMembership(userId: string, channelId: number) {
	return await fetchApi(`/api/memberships/${userId}/${channelId}`, 'POST');
}
export async function getMembership(userId: string, channelId: number, membershipId: number) {
	return await fetchApi(`/api/memberships/${userId}/${channelId}/${membershipId}`, 'GET');
}
export async function deleteMembership(userId: string, channelId: number, membershipId: number) {
	return await fetchApi(`/api/memberships/${userId}/${channelId}/${membershipId}`, 'DELETE');
}

export async function getAllMemberships() {
	return await fetchApi(`/api/memberships}`, 'GET');
}
export async function deleteAllMemberships() {
	return await fetchApi(`/api/memberships}`, 'DELETE');
}

export async function getAllUserMemberships(userId: string) {
	return await fetchApi(`/api/memberships/${userId}`, 'GET');
}
export async function deleteAllUserMemberships(userId: string) {
	return await fetchApi(`/api/memberships/${userId}`, 'DELETE');
}

export async function getAllChannelMemberships(userId: string, channelId: number) {
	return await fetchApi(`/api/memberships/${userId}/${channelId}`, 'GET');
}
export async function deleteAllChannelMemberships(userId: string, channelId: number) {
	return await fetchApi(`/api/memberships/${userId}/${channelId}`, 'DELETE');
}
