import database from '$lib/db/database';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

//get all users
export const GET: RequestHandler = async () => {
	try {
		const usersData = await database.user.findMany();
		if (usersData) {
			const users = usersData.map((userData) => ({
				id: userData.id,
				name: userData.name,
				email: userData.email
			}));
			return json(users);
		} else {
			return json(null);
		}
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while getting the users.');
		}
	}
};

//delete all users
export const DELETE: RequestHandler = async () => {
	try {
		await database.user.deleteMany();

		return json({
			message: `Users deleted successfully.`
		});
	} catch (e: unknown) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, e.message);
		} else if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500, 'An error occurred while deleting the users.');
		}
	}
};
