import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        validationResult(req).throw()
        next();
    } catch (error: any) {
        res.status(403).json({ errors: error.array() })
    }
}

export default validate;