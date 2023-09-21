import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',   
)

export const getUserInfo = async (code: string): Promise<object> => {
    const { tokens } = await getTokens(code);

    const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.CLIENT_ID
    })
    
    const payload = ticket.getPayload();
    if(!payload) throw new Error("Error obtaining user information");
    
    return payload;
}

const getTokens = async (code: string): Promise<GetTokenResponse> => {
    const data = await oAuth2Client.getToken(code);
    if(!data.tokens) throw new Error("Error obtaining user information");

    return data;
}