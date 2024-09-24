import database from '$lib/db/database';
import type { Message } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get all messages from a channel
export const GET: RequestHandler = async ({ params: { user_id, channel_id } }) => {
	try {
		const messagesData = await database.message.findMany({
			where: {
				id_channel: Number(channel_id)
			},
			orderBy: {
				timestamp: 'asc'
			},
			include: {
				user: true
			}
		});
		if (messagesData) {
			const messages: Message[] = messagesData.map((messageData) => ({
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message,
				fileUrl: messageData.fileUrl ? messageData.fileUrl : '',
				guest: user_id !== messageData.user.id,
				user: {
					id: messageData.user.id,
					name: messageData.user.name,
					email: messageData.user.email
				}
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

//delete all messages from a channel
export const DELETE: RequestHandler = async ({ params: { channel_id } }) => {
	try {
		await database.message.deleteMany({
			where: {
				id_channel: Number(channel_id)
			}
		});

		return json({
			message: `Messages of channel ${channel_id} deleted successfully`
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
