import database from '$lib/db/database';
import type { Channel } from '$lib/types';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//update a channel
export const PUT: RequestHandler = async ({ params: { channel_id, owner_user_id }, request }) => {
	const channelData: Channel = await request.json();

	try {
		const currentChannel = await database.channel.findUnique({
            where: {
                id: Number(channel_id),
                id_user_owner: owner_user_id
            },
            include: {
                members: true
            }
        });

        if (!currentChannel) {
            return error(404, 'Channel not found');
        }

        const currentMemberIds = currentChannel.members.map(member => member.id);
        const newMemberIds = channelData.members?.map(member => member.id) || [];

        const membersToAdd = newMemberIds.filter(id => !currentMemberIds.includes(id));
        const membersToRemove = currentMemberIds.filter(id => !newMemberIds.includes(id));

        await database.channel.update({
            where: {
                id: Number(channel_id),
                id_user_owner: owner_user_id
            },
            data: {
                name: channelData.name ? channelData.name.toString() : '',
                members: {
                    connect: membersToAdd.map(id => ({ id })),
                    disconnect: membersToRemove.map(id => ({ id }))
                }
            }
        });

		return json({
			message: `Channel ${channel_id} updated successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return error(400, 'A channel with that name already exists.');
			}
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(400, e.message);
		} else {
			return error(500, 'An error occurred while updating the channel.');
		}
	}
};

//delete a channel
export const DELETE: RequestHandler = async ({ params: { channel_id, owner_user_id } }) => {
	try {
		await database.channel.delete({
			where: {
				id: Number(channel_id),
				id_user_owner: owner_user_id
			}
		});

		return json(`Channel deleted successfully.`);
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the channel.');
		}
	}
};
