import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import validate from "../utils/validateResults";

export const validateUpdateData = [
    body("data")
        .exists({ values: "falsy" })
        .withMessage("Es necesario agregar data")
        .isObject()
        .withMessage("data debe ser un objeto")
        .custom((value, { req }) => {
            const allowedFields = ["name", "lastname", "phone", "address", "image"];
            const invalidFields = Object.keys(value).filter(
                (field) => !allowedFields.includes(field)
            );
            if (invalidFields.length > 0) {
                throw new Error(
                    `Solo se pueden alterar los valores: ${allowedFields.join(", ")}`
                );
            }
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    },
];
