import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import {
	withItemData,
	statelessSessions,
} from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL =
	process.env.DATABASE_URL ||
	'mongodb://localhost/keystone-sleek-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, //How long should they stay signed in?
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: 'User', //which schema is responsible for auth
	identityField: 'email', //login email
	secretField: 'password', //login password
	initFirstItem: {
		fields: ['name', 'email', 'password'], //init
		// Add in initial roles here
	},
	passwordResetLink: {
		async sendToken(args) {
			console.log(args)
		}
	}
});

export default withAuth(
	config({
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
			async onConnect(keystone) {
				if (process.argv.includes('--seed-data')) {
					await insertSeedData(keystone);
				}
			},
		},
		lists: createSchema({
			// Schema items go in here,
			User: User,
			Product: Product,
			ProductImage: ProductImage,
		}),
		ui: {
			// show the UI only for people who ass this test
			isAccessAllowed: ({ session }) => {
				console.log(session);
				return !!session?.data; //turning into boolean
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			// graphQL query
			User: 'id name email',
		}),
	})
);
