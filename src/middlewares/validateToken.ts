import { header } from "express-validator";
import validate from "../utils/validateResults";
import { decodeToken } from "../utils/tokenFunctions";
import { Request, Response, NextFunction } from "express";

export const validateUserAuthorization = [
    header("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom((value, { req }) => {
            const [bearer, token] = value.split(" ");
            if (!bearer || bearer !== "Bearer" || !token)
                throw new Error("Invalid token format");

            const data: any = decodeToken(token);

            req.body.userID = data.id
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    }
]
