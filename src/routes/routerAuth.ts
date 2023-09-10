import { Router } from "express";
import { signUp } from "../handlers/handlerAuth";
import { validateSignUp } from "../middlewares/validateAuth";
const routerAuth = Router();

routerAuth
        .post("/signUp", validateSignUp, signUp)

export default routerAuth;