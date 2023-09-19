import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validateResults";
import { User } from "../dataBase/models/User";

export const validateSignUp = [
    body("name")
        .isString()
        .withMessage("Name debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    body("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase()
        .custom(async (value, { req }): Promise<void> => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error("Ya hay un usuario registrado con este email");
        }),
    body("password")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    },
]

export const validateSignIn = [
    body("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase(),
    body("password")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    },
]

export const validateOAuth = [
    body("code")
        .isString()
        .withMessage("Code debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("El contenido de code no es valido"),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    },
]

export const validateSendReset = [
    body("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase(),
    (req: Request, res: Response, next: NextFunction) => {
        validate(req, res, next);
    },
]

export const validateResetPassword = [
    body("token")
        .isString()
        .withMessage("Name debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    body("newPassword")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    },
]
