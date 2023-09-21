import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import validate from "../utils/validateResults";

export const validateProductID = [
    body("productID")
        .isString()
        .withMessage("productID debe ser un string")
        .trim()
        .isUUID("4")
        .withMessage("productID es invalido")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]
