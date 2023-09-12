import { Router } from "express";
import { signUp, signIn, thirdPartyAuth } from "../handlers/handlerAuth";
import { validateSignUp, validateSignIn, validateThirdPartyAuth } from "../middlewares/validateAuth";
const routerAuth = Router();

routerAuth
        .post("/signUp", validateSignUp, signUp)
        .post("/signIn", validateSignIn, signIn)
        .post("/thirParty", validateThirdPartyAuth, thirdPartyAuth)

export default routerAuth;