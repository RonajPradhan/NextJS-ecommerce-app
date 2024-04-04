import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
	process.env.DATABASE_URL ||
	'mongodb://localhost/keystone-sleek-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, //How long should they stay signed in?
	secret: process.env.COOKIE_SECRET,
};

export default config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true,
		},
	},
	db: {
		adapter: 'mongoose',
		url: databaseURL,
		// TODO: Add data seeding here
	},
	lists: createSchema({
		// Schema items go in here,
	}),
	ui: {
		// TODO: change this for roles
		isAccessAllowed: () => true,
	},
	// TODO: Add session values here
});
