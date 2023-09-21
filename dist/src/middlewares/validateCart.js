"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuantity = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
exports.validateQuantity = [
    (0, express_validator_1.body)("quantity")
        .isNumeric()
        .withMessage("quantity debe ser un numero"),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
