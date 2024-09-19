import database from '$lib/db/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { User } from '$lib/types';

//get an user
export const GET: RequestHandler = async ({ params: { user_id } }) => {
	try {
		const userData = await database.user.findUnique({
			where: {
				id: user_id
			}
		});
		if (userData) {
			const user: User = {
				id: userData.id,
				name: userData.name,
				email: userData.email,
			};
			return json(user);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the user');
		}
	}
};

//update an user
export const PUT: RequestHandler = async ({ params: { user_id }, request }) => {
	const userData = await request.json();

	try {
		await database.user.update({
			where: {
				id: user_id
			},
			data: userData
		});

		return json({
			message: `User ${user_id} updated successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while updating the user');
		}
	}
};

//delete an user
export const DELETE: RequestHandler = async ({ params: { user_id } }) => {
	try {
		await database.user.delete({
			where: {
				id: user_id
			}
		});

		return json({
			message: `User ${user_id} deleted successfully`
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the user');
		}
	}
};
