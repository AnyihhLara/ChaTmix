import database from '$lib/db/database';
import type { Channel } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get all channels
export const GET: RequestHandler = async () => {
	try {
		const channelsData = await database.channel.findMany({
			include: {
				owner: true,
				members: true
			}
		});
		if (channelsData) {
			const channels: Channel[] = channelsData.map((channelData) => ({
				id: channelData.id,
				name: channelData.name,
				owner: {
					id: channelData.owner.id,
					name: channelData.owner.name,
					email: channelData.owner.email
				},
				members: channelData.members
			}));
			return json(channels);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the channels.');
		}
	}
};

//delete all channels
export const DELETE: RequestHandler = async () => {
	try {
		await database.channel.deleteMany();

		return json({
			message: `Channels deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the channels.');
		}
	}
};
