import database from '$lib/db/database';
import type { Message } from '$lib/types';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get a message
export const GET: RequestHandler = async ({ params: { message_id } }) => {
	try {
		const messageData = await database.message.findUnique({
			where: {
				id: Number(message_id)
			}
		});
		if (messageData) {
			const message: Message = {
				id: messageData.id,
				timestamp: messageData.timestamp,
				message: messageData.message
			};
			return json(message);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the message');
		}
	}
};

//update a message
export const PUT: RequestHandler = async ({ params: { message_id }, request }) => {
	const messageData = await request.json();

	try {
		await database.message.update({
			where: {
				id: Number(message_id)
			},
			data:messageData
		});

		return json({
			message: `Message ${message_id} updated successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while updating the message');
		}
	}
};

//delete a message
export const DELETE: RequestHandler = async ({ params: { message_id } }) => {
	try {
		await database.message.delete({
			where: {
				id: Number(message_id)
			}
		});

		return json({
			message: `Message ${message_id} deleted successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the message');
		}
	}
};
