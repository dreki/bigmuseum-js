import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export default NextAuth({
    providers: [
        new RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            scope: 'history identity vote read report'
        })
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
