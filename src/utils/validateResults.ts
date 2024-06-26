import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        validationResult(req).throw()
        next();
    } catch (error: any) {
        const result2 = error.formatWith((err: any) => err.msg);
        res.status(400).json({ errors: result2.mapped() })
    }
}

export default validate;
