import { withIronSessionApiRoute } from 'iron-session/next';
import { IRON_SESSION_CONFIG } from "lib/config";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

// Export handler
export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
    res.end();
}
