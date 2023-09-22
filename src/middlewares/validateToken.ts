import { header } from "express-validator";
import validate from "../utils/validateResults";
import { decodeToken } from "../utils/tokenFunctions";
import { Request, Response, NextFunction } from "express";
import { User } from "../dataBase/models/User";

export const validateUserAuthorization = [
    header("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom((value, { req }) => {
            const id = validateToken(value);
            req.body.userID = id;
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    }
]


export const validateAdminAuthorization = [
    header("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom(async (value, { req }) => {
            const id = validateToken(value);

            const user = await User.findByPk(id);
            if (!user) throw new Error("El usuario no existe");
            if (user.role !== "admin") throw new Error("No tienes acceso a este sitio");

            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    }
]

const validateToken = (value: string): string => {
    const [bearer, token] = value.split(" ");
    if (!bearer || bearer !== "Bearer" || !token)
        throw new Error("El formato del token es invalido");

    const { id }: any = decodeToken(token);

    return id;
}