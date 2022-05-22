import { withIronSessionApiRoute } from "iron-session/next";
import { IRON_SESSION_CONFIG } from "lib/config";
import { NextApiRequest, NextApiResponse } from "next";
// Import snoowrap
import snoowrap, { RedditUser, Subreddit } from 'snoowrap';

export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get query parameters.
    const { code, state } = req.query;
    // Log query parameters.
    console.log(`> query ${JSON.stringify(req.query)}`);

    // POST to Reddit's OAuth2 endpoint to get an access token.
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/auth/callback`
    });
    const { access_token, refresh_token } = await response.json();
    // Log access token.
    console.log(`> access_token ${access_token}`);
    // Log refresh token.
    console.log(`> refresh_token ${refresh_token}`);

    // Init snoowrap
    const reddit = new snoowrap({
        userAgent: 'bigmuseum-app',
        // accessToken: access_token,
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        refreshToken: refresh_token
    });
    // Get user info.
    await reddit.getMe().then(async (user: RedditUser) => {
        // Log user info.
        console.log(`> user ${JSON.stringify(user)}`);
        // Get user's subreddits.
        // const subreddits: Subreddit[] = await user.getSubscriptions();
        // Log user's subreddits.
        // console.log(`> subreddits ${JSON.stringify(subreddits)}`);
    });
    // const user: RedditUser = await reddit.getMe();
    // console.log(user);

    // Get `r/museum` subreddit.
    // const subreddit: Subreddit = await reddit.getSubreddit('museum');
    // console.log(subreddit);
    
    
    // Return a generic 200
    res.status(200).json({ name: 'John Doe' })
}
