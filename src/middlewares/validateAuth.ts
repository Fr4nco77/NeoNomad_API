import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validateResults";
import { User } from "../dataBase/models/User";
import jwt from "jsonwebtoken";

export const validateSignUp = [
    body("name")
        .isString()
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    body("email")
        .isString()
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de email")
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error("Ya hay un usuario registrado con este email");
        }),
    body("password")
        .isString()
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        validate(req, res, next);
    },
]

