import database from '$lib/db/database';
import type { Channel } from '$lib/types';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//create a channel
export const POST: RequestHandler = async ({ params: { owner_user_id }, request }) => {
	const chnlData:Channel = await request.json();

	try {
		const channelData = await database.channel.create({
			data: {
				name: chnlData.name,
				owner: {
					connect: {
						id: owner_user_id
					}
				},
				members:{
					connect: chnlData.members?.map(member => ({ id:member.id }))
				}
			},
			include: {
				members: true
			}
		});
		if (channelData) {
			const channel: Channel = {
				id: channelData.id,
				name: channelData.name,
				members: channelData.members
			};
			return json(channel);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while creating the channel.');
		}
	}
};

//get all channels from a user
export const GET: RequestHandler = async ({ params: { owner_user_id } }) => {
	try {
		const channelsData = await database.channel.findMany({
			where: {
				id_user_owner: owner_user_id
			},
			include: { members: true }
		});

		if (channelsData) {
			const channels: Channel[] = channelsData.map((channelData) => ({
				id: channelData.id,
				name: channelData.name,
				members: channelData.members
			}));
			return json(channels);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the channels of this user.');
		}
	}
};

//delete all channels from a user
export const DELETE: RequestHandler = async ({ params: { owner_user_id } }) => {
	try {
		await database.channel.deleteMany({
			where: {
				id_user_owner: owner_user_id
			}
		});

		return json({
			message: `Channels of user ${owner_user_id} deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the channels of this user.');
		}
	}
};
