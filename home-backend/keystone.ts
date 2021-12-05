import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import 'dotenv/config';
import { LoomVideo } from './schemas/LoomVideo';
import { KeystoneContext } from '@keystone-next/types';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/xavi';
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: add in initial roles here
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        onConnect(args: KeystoneContext) {
            console.log('Connected to the database!');
        }
        // TODO: add seeding data here
    },
    lists: createSchema({
        // schema items go in here
        User,
        LoomVideo,
    }),
    ui: {
        isAccessAllowed: ({ session }) => {
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL query
        User: `id`
    })
}))
