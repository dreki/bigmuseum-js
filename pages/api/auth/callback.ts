import { withIronSessionApiRoute } from "iron-session/next";
import { IRON_SESSION_CONFIG } from "lib/config";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(handler, IRON_SESSION_CONFIG)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Log request method.
    console.log(`> method ${req.method}`);
    // Get query parameters.
    const { code, state } = req.query;
    // Log query parameters.
    console.log(`> query ${JSON.stringify(req.query)}`);
    // Log request
    // console.log(req);
    // Log session
    console.log(req.session);
    // Log body
    console.log('> body:');
    console.log(req.body);
    // // Generate a state token to prevent request forgery.
    // // Store it in the session for later validation.
    // const state = Math.random().toString(36).substring(2);
    // req.session.state = state;
    // // Redirect to Reddit auth.
    // res.writeHead(302, {
    //     Location: 'https://www.reddit.com/api/v1/authorize?' +
    //         `client_id=${process.env.REDDIT_CLIENT_ID}` +
    //         '&response_type=code' +
    //         `&state=${req.session.state}` +
    //         '&redirect_uri=http://localhost:3000/api/auth/callback' +
    //         '&duration=permanent' +
    //         '&scope=identity'
    // });
    // Return a generic 200
    res.status(200).json({ name: 'John Doe' })
}
