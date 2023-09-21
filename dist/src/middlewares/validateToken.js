"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserAuthorization = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
const tokenFunctions_1 = require("../utils/tokenFunctions");
exports.validateUserAuthorization = [
    (0, express_validator_1.header)("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom((value, { req }) => {
        const [bearer, token] = value.split(" ");
        if (!bearer || bearer !== "Bearer" || !token)
            throw new Error("Invalid token format");
        const data = (0, tokenFunctions_1.decodeToken)(token);
        req.body.userID = data.id;
        return true;
    }),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
