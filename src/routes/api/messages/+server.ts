import database from '$lib/db/database';
import type { Message } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get all messages
export const GET: RequestHandler = async () => {
	try {
		const messagesData = await database.message.findMany({
			include: {
				channel: true,
				user: true
			}
		});
		if (messagesData) {
			const messages: Message[] = messagesData.map((messageData) => ({
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message,
				channel: {
					id: messageData.channel.id,
					name: messageData.channel.name,
				},
				user: {
					id: messageData.user.id,
					name: messageData.user.name,
					email: messageData.user.email,
				},
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
			return error(500, 'An error occurred while getting the messages.');
		}
	}
};

//delete all messages
export const DELETE: RequestHandler = async () => {
	try {
		await database.message.deleteMany();

		return json({
			message: `Messages deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the messages.');
		}
	}
};
