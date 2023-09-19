"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (error) {
        const result2 = error.formatWith((err) => err.msg);
        res.status(400).json({ errors: result2.mapped() });
    }
};
exports.default = validate;
