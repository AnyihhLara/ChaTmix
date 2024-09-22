import database from '$lib/db/database';
import type { Channel } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get a channel
export const GET: RequestHandler = async ({ params: { channel_id } }) => {
	try {
		const channelData = await database.channel.findUnique({
			where: {
				id: Number(channel_id)
			},
			include: {
				owner: true,
				members: true
			}
		});
		if (channelData) {
			const channel: Channel = {
				id: channelData.id,
				name: channelData.name,
				members: channelData.members,
				owner: channelData.owner,
			};
			return json(channel);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the channel.');
		}
	}
};
