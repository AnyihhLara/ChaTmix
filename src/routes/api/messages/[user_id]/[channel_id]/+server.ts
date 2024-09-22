import database from '$lib/db/database';
import type { Message } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//create a message
export const POST: RequestHandler = async ({ params: { user_id, channel_id }, request }) => {
	const msgData = await request.json();

	try {
		const messageData = await database.message.create({
			data: {
				message: msgData.message,
				fileUrl: msgData.fileUrl,
				channel: {
					connect: {
						id: Number(channel_id)
					}
				},
				user: {
					connect: {
						id: user_id
					}
				}
			}
		});
		if (messageData) {
			const message: Message = {
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message,
				host: false
			};
			return json(message);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(400, e.message);
		} else {
			return error(500, 'An error occurred while creating the message.');
		}
	}
};

//get all messages from an user in a channel
export const GET: RequestHandler = async ({ params: { user_id, channel_id } }) => {
	try {
		const messagesData = await database.message.findMany({
			where: {
				id_channel: Number(channel_id),
				id_user: user_id
			},
			orderBy: {
				timestamp: 'asc'
			}
		});
		if (messagesData) {
			const messages: Message[] = messagesData.map((messageData) => ({
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message
			}));
			return json(messages);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(
				500,
				'An error occurred while getting the messages from this user of this channel.'
			);
		}
	}
};

//delete all messages from an user in a channel
export const DELETE: RequestHandler = async ({ params: { user_id, channel_id } }) => {
	try {
		await database.message.deleteMany({
			where: {
				id_user: user_id,
				id_channel: Number(channel_id)
			}
		});

		return json({
			message: `Messages from user ${user_id} of channel ${channel_id} deleted successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(
				500,
				'An error occurred while deleting the messages from this user of this channel.'
			);
		}
	}
};
