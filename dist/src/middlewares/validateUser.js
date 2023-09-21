"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateData = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
exports.validateUpdateData = [
    (0, express_validator_1.body)("data")
        .exists({ values: "falsy" })
        .withMessage("Es necesario agregar data")
        .isObject()
        .withMessage("data debe ser un objeto")
        .custom((value, { req }) => {
        const allowedFields = ["name", "lastname", "phone", "address", "image"];
        const invalidFields = Object.keys(value).filter((field) => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Solo se pueden alterar los valores: ${allowedFields.join(", ")}`);
        }
        return true;
    }),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
