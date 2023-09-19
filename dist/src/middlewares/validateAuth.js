"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.validateSendReset = exports.validateOAuth = exports.validateSignIn = exports.validateSignUp = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
const User_1 = require("../dataBase/models/User");
exports.validateSignUp = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Name debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { email: value } });
        if (user)
            throw new Error("Ya hay un usuario registrado con este email");
    })),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
exports.validateSignIn = [
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase(),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
exports.validateOAuth = [
    (0, express_validator_1.body)("code")
        .isString()
        .withMessage("Code debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("El contenido de code no es valido"),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
exports.validateSendReset = [
    (0, express_validator_1.body)("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
exports.validateResetPassword = [
    (0, express_validator_1.body)("token")
        .isString()
        .withMessage("Name debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de name")
        .escape(),
    (0, express_validator_1.body)("newPassword")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
