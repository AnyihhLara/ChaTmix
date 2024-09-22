import database from '$lib/db/database';
import { supabase } from '$lib/supabaseClient';
import type { Message } from '$lib/types';
import { Prisma } from '@prisma/client';
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
				message: messageData.message,
				fileUrl: messageData.fileUrl ? messageData.fileUrl : ''
			};
			return json(message);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
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
			data: messageData
		});

		return json({
			message: `Message ${message_id} updated successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while updating the message');
		}
	}
};

//delete a message
export const DELETE: RequestHandler = async ({ params: { message_id } }) => {
	try {
		const message = await database.message.findUnique({
			where: {
				id: Number(message_id)
			}
		});

		if (!message) {
			return error(404, 'Message not found');
		}

		if (message.fileUrl) {
			const fileName = message.fileUrl.split('/').pop();
			if (fileName) {
				const { error: deleteFileError } = await supabase.storage
					.from('message-files')
					.remove([fileName]);

				if (deleteFileError) {
					throw new Error(`Error deleting file: ${deleteFileError.message}`);
				}
			}
		}
		await database.message.delete({
			where: {
				id: Number(message_id)
			}
		});

		return json({
			message: `Message ${message_id} deleted successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the message');
		}
	}
};
