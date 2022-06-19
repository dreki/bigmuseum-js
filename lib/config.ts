import 'iron-session';
import { IronSessionOptions } from 'iron-session';

interface Session {
    state: string;
    redditUserId: string;
    accessToken: string;
    refreshToken: string;
}

declare module 'iron-session' {
    // export interface Session {
    //     state: string;
    // }
    interface IronSessionData extends Session {
    }
}

// Require `process.env.SESSION_PASSWORD` to be set.
if (!process.env.SESSION_PASSWORD) {
    throw new Error('SESSION_PASSWORD environment variable is missing');
}

const IRON_SESSION_CONFIG: IronSessionOptions = {
    cookieName: 'bigmuseum-session',
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
};

export { IRON_SESSION_CONFIG, Session };
