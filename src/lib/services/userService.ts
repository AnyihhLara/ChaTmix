import type { User } from '$lib/types';
import { fetchApi } from '$lib/utils';

export async function getUser(userId: string): Promise<User> {
	return await fetchApi(`/api/users/${userId}`, 'GET');
}
export async function updateUser(userId: string, userData: User) {
	return await fetchApi(`/api/users/${userId}`, 'PUT', userData);
}
export async function deleteUser(userId: string) {
	return await fetchApi(`/api/users/${userId}`, 'DELETE');
}

export async function getAllUsers(): Promise<User[]> {
	return await fetchApi(`/api/users}`, 'GET');
}
export async function deleteAllUsers() {
	return await fetchApi(`/api/users}`, 'DELETE');
}
