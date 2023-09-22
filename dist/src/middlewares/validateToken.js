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
exports.validateAdminAuthorization = exports.validateUserAuthorization = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
const tokenFunctions_1 = require("../utils/tokenFunctions");
const User_1 = require("../dataBase/models/User");
exports.validateUserAuthorization = [
    (0, express_validator_1.header)("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom((value, { req }) => {
        const id = validateToken(value);
        req.body.userID = id;
        return true;
    }),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateAdminAuthorization = [
    (0, express_validator_1.header)("authorization")
        .isString()
        .withMessage("El token debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("El token esta vacio")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = validateToken(value);
        const user = yield User_1.User.findByPk(id);
        if (!user)
            throw new Error("El usuario no existe");
        if (user.role !== "admin")
            throw new Error("No tienes acceso a este sitio");
        return true;
    })),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
const validateToken = (value) => {
    const [bearer, token] = value.split(" ");
    if (!bearer || bearer !== "Bearer" || !token)
        throw new Error("El formato del token es invalido");
    const { id } = (0, tokenFunctions_1.decodeToken)(token);
    return id;
};
