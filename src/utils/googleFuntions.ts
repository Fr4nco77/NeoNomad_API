import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',   
)

export const getUserInfo = async (code: string): Promise<object> => {
    const { tokens } = await oAuth2Client.getToken(code)
    if(!tokens.id_token) throw new Error("Error obtaining user information");

    const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.CLIENT_ID
    })
    
    const payload = ticket.getPayload();
    if(!payload) throw new Error("Error obtaining user information");
    
    return payload;
}