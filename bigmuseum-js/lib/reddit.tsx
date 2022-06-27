import Snoowrap, { RedditUser, Subreddit } from 'snoowrap';

// const reddit = new Snoowrap({
//     userAgent: 'bigmuseum-app',
//     // accessToken: access_token,
//     accessToken,
//     clientId: process.env.REDDIT_CLIENT_ID,
//     clientSecret: process.env.REDDIT_CLIENT_SECRET,
//     refreshToken
// });

/**
 * Reddit client.
 */
class Reddit extends Snoowrap {
    /**
     * Creates a new Reddit client.
     * @param accessToken - The access token to use for requests to the Reddit API.
     * @param refreshToken - The refresh token to use for requests to the Reddit API.
     */
    constructor(accessToken: string, refreshToken: string) {
        super({
            userAgent: 'bigmuseum-app',
            accessToken,
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            refreshToken
        });
    }
}

export default Reddit;
