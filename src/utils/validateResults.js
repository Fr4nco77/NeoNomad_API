"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validate = function (req, res, next) {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (error) {
        res.status(403).json({ errors: error.array() });
    }
};
exports.default = validate;
