import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Slack({
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET
        })
    ],
    database: process.env.DATABASE_URL
}

const SlackAuth = (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
export default SlackAuth;