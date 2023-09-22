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
exports.validateParamID = exports.validateRemoveProduct = exports.validateUpdateProduct = exports.validatePostProduct = exports.validateStatusOrder = exports.validateBann = exports.validateSignIn = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = __importDefault(require("../utils/validateResults"));
const User_1 = require("../dataBase/models/User");
const Order_1 = require("../dataBase/models/Order");
const Product_1 = require("../dataBase/models/Product");
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
exports.validateBann = [
    (0, express_validator_1.param)("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findByPk(value);
        if (!user)
            throw new Error("El usuario no existe");
        req.body.user = user;
        return true;
    })),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateStatusOrder = [
    (0, express_validator_1.body)("status")
        .isString()
        .withMessage("El status debe ser un string")
        .trim()
        .isIn(["Pendiente", "Cancelado", "Aprovado"]),
    (0, express_validator_1.body)("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield Order_1.Order.findByPk(value);
        if (!order)
            throw new Error("La orden no existe");
        req.body.order = order;
        return true;
    })),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validatePostProduct = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("name debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("name no puede estar vacio")
        .escape()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield Product_1.Product.findOne({ where: { name: value } });
        if (product)
            throw new Error("Ya existe un producto con ese nombre");
        return true;
    })),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("description debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("description no puede estar vacio")
        .escape(),
    (0, express_validator_1.body)("image")
        .isString()
        .withMessage("image debe ser un string")
        .trim()
        .isURL()
        .withMessage("el formato de image es invalido")
        .escape(),
    (0, express_validator_1.body)("price")
        .isNumeric()
        .withMessage("price debe ser un numero"),
    (0, express_validator_1.body)("categoryName")
        .isString()
        .withMessage("categoryName debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("categoryName no puede estar vacio")
        .escape(),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateUpdateProduct = [
    (0, express_validator_1.body)("data")
        .exists({ values: "falsy" })
        .withMessage("Es necesario agregar data")
        .isObject()
        .withMessage("data debe ser un objeto")
        .custom((value, { req }) => {
        const allowedFields = ["name", "description", "image", "price", "categoryName"];
        const invalidFields = Object.keys(value).filter((field) => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Solo se pueden alterar los valores: ${allowedFields.join(", ")}`);
        }
        return true;
    }),
    (0, express_validator_1.body)("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del producto")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield Product_1.Product.findByPk(value);
        if (!product)
            throw new Error("El producto no existe");
        req.body.product = product;
        return true;
    })),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    },
];
exports.validateRemoveProduct = [
    (0, express_validator_1.param)("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del producto")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield Product_1.Product.findByPk(value);
        if (!product)
            throw new Error("El producto no existe");
        req.body.product = product;
        return true;
    })),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
exports.validateParamID = [
    (0, express_validator_1.param)("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto"),
    (req, res, next) => {
        (0, validateResults_1.default)(req, res, next);
    }
];
