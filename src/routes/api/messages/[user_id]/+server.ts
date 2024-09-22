import database from '$lib/db/database';
import type { Message } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get all messages from a user
export const GET: RequestHandler = async ({ params: { user_id } }) => {
	try {
		const messagesData = await database.message.findMany({
			where: {
				id_user: user_id
			},
			include: {
				channel: true
			}
		});
		if (messagesData) {
			const messages: Message[] = messagesData.map((messageData) => ({
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message,
				fileUrl: messageData.fileUrl ? messageData.fileUrl : '',
				channel: {
					id: messageData.channel.id,
					name: messageData.channel.name
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
			return error(500, 'An error occurred while getting the messages of this user.');
		}
	}
};

//delete all messages from a user
export const DELETE: RequestHandler = async ({ params: { user_id } }) => {
	try {
		await database.message.deleteMany({
			where: {
				id_user: user_id
			}
		});

		return json({
			message: `Messages of user ${user_id} deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the messages of this user.');
		}
	}
};
