import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "../utils/validateResults";

export const validateQuantity = [
    body("quantity")
        .isNumeric()
        .withMessage("quantity debe ser un numero"),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]