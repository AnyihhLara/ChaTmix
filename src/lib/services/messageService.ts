import type { Message } from '$lib/types';
import { fetchApi } from '$lib/utils';

export async function createMessage(userId: string, channelId: number,  messageData: Message): Promise<Message> {
	return await fetchApi(`/api/messages/${userId}/${channelId}`, 'POST', messageData);
}
export async function getMessage(userId: string, channelId: number, messageId: number): Promise<Message> {
	return await fetchApi(`/api/messages/${userId}/${channelId}/${messageId}`, 'GET');
}
export async function updateMessage(userId: string, channelId: number, messageId: number,  messageData: Message) {
	return await fetchApi(`/api/messages/${userId}/${channelId}/${messageId}`, 'PUT',  messageData);
}
export async function deleteMessage(userId: string, channelId: number, messageId: number) {
	return await fetchApi(`/api/messages/${userId}/${channelId}/${messageId}`, 'DELETE');
}

export async function getAllMessages(): Promise<Message[]> {
	return await fetchApi(`/api/messages}`, 'GET');
}
export async function deleteAllMessages() {
	return await fetchApi(`/api/messages}`, 'DELETE');
}

export async function getAllUserMessages(userId: string): Promise<Message[]> {
	return await fetchApi(`/api/messages/${userId}`, 'GET');
}
export async function deleteAllUserMessages(userId: string) {
	return await fetchApi(`/api/messages/${userId}`, 'DELETE');
}

export async function getAllChannelMessages(userId: string, channelId: number): Promise<Message[]> {
	return await fetchApi(`/api/messages/${userId}/${channelId}/channel`, 'GET');
}
export async function deleteAllChannelMessages(userId: string, channelId: number) {
	return await fetchApi(`/api/messages/${userId}/${channelId}/channel`, 'DELETE');
}

export async function getAllUserMessagesChannel(userId: string, channelId: number): Promise<Message[]> {
	return await fetchApi(`/api/messages/${userId}/${channelId}`, 'GET');
}
export async function deleteAllUserMessagesChannel(userId: string, channelId: number) {
	return await fetchApi(`/api/messages/${userId}/${channelId}`, 'DELETE');
}
