import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next';

type Data = {
    name: string;
};

// If `process.env.SESSION_PASSWORD is missing, raise an error.
if (!process.env.SESSION_PASSWORD) {
    throw new Error('SESSION_PASSWORD environment variable is missing');
}

declare module 'iron-session' {
    // export interface Session {
    //     state: string;
    // }
    interface IronSessionData {
        state: string;
    }
}

export default withIronSessionApiRoute(handler, {
    cookieName: 'bigmuseum-session',
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
});

// Export handler
// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Log session
    console.log(req.session);
    // Generate a state token to prevent request forgery.
    // Store it in the session for later validation.
    const state = Math.random().toString(36).substring(2);
    req.session.state = state;
    // Redirect to Reddit auth.
    res.writeHead(302, {
        Location: 'https://www.reddit.com/api/v1/authorize?' +
            `client_id=${process.env.REDDIT_CLIENT_ID}` +
            '&response_type=code' +
            `&state=${req.session.state}` +
            '&redirect_uri=http://localhost:3000/api/auth/callback' +
            '&duration=permanent' +
            '&scope=identity'
    });
    res.status(200).json({ name: 'John Doe' })
}
