import { Router } from "express";
import { getUserData, getOrdersData, updateUserData } from "../handlers/handlerUser";
import { validateUserAuthorization } from "../middlewares/validateToken";
import { validateUpdateData } from "../middlewares/validateUser";

const routerUser = Router();

routerUser
    .get("/", validateUserAuthorization, getUserData)
    .get("/orders", validateUserAuthorization, getOrdersData)
    .put("/update", validateUserAuthorization, validateUpdateData, updateUserData)

export default routerUser;
