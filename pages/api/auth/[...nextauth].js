import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export default NextAuth({
    secret: 'TAod+eJICcTwxgFiuCOknfGD3AmDw52Cqj6vCfnL+h4=',
    providers: [
        // new RedditProvider({
        //     clientId: process.env.REDDIT_CLIENT_ID,
        //     clientSecret: process.env.REDDIT_CLIENT_SECRET,
        //     scope: 'history identity vote read report',
        //     type: "oauth",
        //     version: "2.0",
        //     params: { grant_type: "authorization_code" },
        //     accessTokenUrl: " https://www.reddit.com/api/v1/access_token",
        //     authorizationUrl:
        //       "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
        //     profileUrl: "https://oauth.reddit.com/api/v1/me",
        // })

        // TODO: Replace with custom, just Reddit, login behavior.

        {
            id: "reddit",
            name: "Reddit",
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            // scope: "identity mysubreddits read", //Check Reddit API Documentation for more. The identity scope is required.
            scope: 'history identity vote read report',
            type: "oauth",
            version: "2.0",
            params: { grant_type: "authorization_code" },
            accessTokenUrl: " https://www.reddit.com/api/v1/access_token",
            authorizationUrl:
                "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
            authorization: {
                url: "https://www.reddit.com/api/v1/authorize",
                params: {
                    client_id: process.env.REDDIT_CLIENT_ID,
                    // redirect_uri: "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
                    redirect_uri: 'http://localhost:3000/api/auth/callback/reddit',
                    state: "",
                    // scope: "history identity vote read report mysubreddits read",
                    scope: 'identity mysubreddits read',
                    duration: "permanent",
                    response_type: "code"
                }
            },
            token: {
                url: "https://www.reddit.com/api/v1/access_token",
                params: {
                    client_id: process.env.REDDIT_CLIENT_ID,
                    client_secret: process.env.REDDIT_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    redirect_uri: "http://localhost:3000/api/auth/callback/reddit",
                    code: ""
                }
            },
            userinfo: {
                url: "https://oauth.reddit.com/api/v1/me",
                params: {
                    raw_json: 1
                }
            },
            profileUrl: "https://oauth.reddit.com/api/v1/me",
            profile: (profile) => {
                console.log(`> profile: ${JSON.stringify(profile)}`);
                return {
                    id: profile.id,
                    name: profile.name,
                    email: null,
                }
            },
        },
    ],
    callbacks: {
        async session({ session, token, user }) {
            console.log(session);
            console.log(token);
            console.log(user);
            return session
        }
    }
});
