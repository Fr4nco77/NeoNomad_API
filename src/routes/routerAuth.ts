import { Router } from "express";
import { signUp, signIn, OAuth, validateEmail, sendPasswordResetEmail, resetPassword } from "../handlers/handlerAuth";
import { validateSignUp, validateSignIn, validateOAuth, validateSendReset, validateResetPassword } from "../middlewares/validateAuth";
const routerAuth = Router();

routerAuth
        .post("/local/signUp", validateSignUp, signUp)
        .post("/local/signIn", validateSignIn, signIn)
        .post("/OAuth", validateOAuth, OAuth)
        .get("/validate/:id", validateEmail)
        .get("/send/resetPassword", validateSendReset, sendPasswordResetEmail)
        .put("/resetPassword", validateResetPassword, resetPassword)

export default routerAuth;