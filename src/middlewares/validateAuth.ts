import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validateResults";
import { User } from "../dataBase/models/User";
import bcrypt from "bcryptjs";

export const validateSignUp = [
    body("name")
        .isString()
        .withMessage("El tipo de dato de name no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    body("email")
        .isString()
        .withMessage("El tipo de dato de email no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de email")
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
        .withMessage("El tipo de dato de password no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    },
]

export const validateSignIn = [
    body("email")
        .isString()
        .withMessage("El tipo de dato de email no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de email")
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase()
        .custom(async (value, { req }): Promise<void> => {
            const user = await User.findOne({ where: { email: value } });
            if (!user) throw new Error("Email o contraseña incorrecta");
            if (user.isBanned) throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");
        }),
    body("password")
        .isString()
        .withMessage("El tipo de dato de password no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape()
        .custom(async (value, { req }): Promise<void> => {
            const user = await User.findOne({ where: { email: req.body.email } });
            const isValidPassword = await bcrypt.compare(value, user!.password);
            if (!isValidPassword) throw new Error("Email o contraseña incorrecta");
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    },
]

export const validateThirdPartyAuth = [
    body("email")
        .isString()
        .withMessage("El tipo de dato de email no es valido")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de email")
        .escape()
        .toLowerCase()
        .custom(async (value, { req }): Promise<void> => {
            const user = await User.findOne({ where: { email: value } });
            if (!user) throw new Error("Email incorrecto");
            if (user.localRegistration) throw new Error("Usuario registrado localmente");
            if (user.isBanned) throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    }
]
