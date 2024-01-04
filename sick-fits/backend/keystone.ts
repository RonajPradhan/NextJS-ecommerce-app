import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { createAuth } from "@keystone-next/auth";
import {
	withItemData,
	statelessSessions,
} from "@keystone-next/keystone/session";
import { insertSeedData } from "./seed-data";

const databaseURL =
	process.env.DATABASE_URL ||
	"mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, // How long do they stay signed in?
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	initFirstItem: {
		fields: ["name", "email", "password"],
		// TODO: Add roles to this
	},
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
			adapter: "mongoose",
			url: databaseURL,
			// TODO: Add data seeding here
			async onConnect(keystone) {
				console.log(`Connected to database`);
				if (process.argv.includes("--seed-data")) {
					await insertSeedData(keystone);
				}
			},
		},
		lists: createSchema({
			User,
			Product,
			ProductImage,
		}),
		ui: {
			// TODO: Change this for roles
			isAccessAllowed: ({ session }) => {
				// console.log(session);
				return !!session?.data;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			User: `id`,
		}),
	})
);
