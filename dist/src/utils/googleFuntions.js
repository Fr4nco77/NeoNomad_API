"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const google_auth_library_1 = require("google-auth-library");
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');
const getUserInfo = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield oAuth2Client.getToken(code);
    if (!tokens.id_token)
        throw new Error("Error obtaining user information");
    const ticket = yield oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    if (!payload)
        throw new Error("Error obtaining user information");
    return payload;
});
exports.getUserInfo = getUserInfo;
