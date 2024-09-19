import database from '$lib/db/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//update a channel
export const PUT: RequestHandler = async ({ params: { channel_id }, request }) => {
	const channelData = await request.json();

	try {
		await database.channel.update({
			where: {
				id: Number(channel_id)
			},
			data: channelData
		});

		return json({
			message: `Channel ${channel_id} updated successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while updating the channel.');
		}
	}
};

//delete a channel
export const DELETE: RequestHandler = async ({ params: { channel_id } }) => {
	try {
		await database.channel.delete({
			where: {
				id: Number(channel_id)
			}
		});

		return json({
			message: `Channel ${channel_id} deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the channel.');
		}
	}
};
