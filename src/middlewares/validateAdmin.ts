import { body, param } from "express-validator";
import validate from "../utils/validateResults";
import { Request, Response, NextFunction } from "express";
import { User } from "../dataBase/models/User";
import { Order } from "../dataBase/models/Order";
import { Product } from "../dataBase/models/Product";

export const validateSignIn = [
    body("email")
        .isString()
        .withMessage("Email debe ser un string")
        .trim()
        .isEmail()
        .withMessage("El formato de email no es valido")
        .escape()
        .toLowerCase(),
    body("password")
        .isString()
        .withMessage("Password debe ser un string")
        .trim()
        .exists({ values: "falsy" })
        .withMessage("No se recibio un valor valido de password")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next)
    },
]

export const validateBann = [
    param("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom(async (value, { req }) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error("El usuario no existe");

            req.body.user = user;
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]

export const validateStatusOrder = [
    body("status")
        .isString()
        .withMessage("El status debe ser un string")
        .trim()
        .isIn(["Pendiente", "Cancelado", "Aprovado"]),
    body("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom(async (value, { req }) => {
            const order = await Order.findByPk(value);
            if (!order) throw new Error("La orden no existe");

            req.body.order = order;
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]

export const validatePostProduct = [
    body("name")
        .isString()
        .withMessage("name debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("name no puede estar vacio")
        .escape()
        .custom(async (value, { req }) => {
            const product = await Product.findOne({ where: { name: value } })
            if (product) throw new Error("Ya existe un producto con ese nombre");
            return true;
        }),
    body("description")
        .isString()
        .withMessage("description debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("description no puede estar vacio")
        .escape(),
    body("image")
        .isString()
        .withMessage("image debe ser un string")
        .trim()
        .isURL()
        .withMessage("el formato de image es invalido")
        .escape(),
    body("price")
        .isNumeric()
        .withMessage("price debe ser un numero"),
    body("categoryName")
        .isString()
        .withMessage("categoryName debe ser un string")
        .trim()
        .notEmpty()
        .withMessage("categoryName no puede estar vacio")
        .escape(),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]

export const validateUpdateProduct = [
    body("data")
        .exists({ values: "falsy" })
        .withMessage("Es necesario agregar data")
        .isObject()
        .withMessage("data debe ser un objeto")
        .custom((value, { req }) => {
            const allowedFields = ["name", "description", "image", "price", "categoryName"];
            const invalidFields = Object.keys(value).filter(
                (field) => !allowedFields.includes(field)
            );
            if (invalidFields.length > 0) {
                throw new Error(
                    `Solo se pueden alterar los valores: ${allowedFields.join(", ")}`
                );
            }
            return true;
        }),
    body("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del producto")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom(async (value, { req }) => {
            const product = await Product.findByPk(value);
            if (!product) throw new Error("El producto no existe");

            req.body.product = product;
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    },
];

export const validateRemoveProduct = [
    param("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del producto")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto")
        .custom(async (value, { req }) => {
            const product = await Product.findByPk(value);
            if (!product) throw new Error("El producto no existe");

            req.body.product = product;
            return true;
        }),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]

export const validateParamID = [
    param("id")
        .exists({ values: "falsy" })
        .withMessage("Es necesario que se envie el id del usuario")
        .trim()
        .isUUID("4")
        .withMessage("El formato de id no es correcto"),
    (req: Request, res: Response, next: NextFunction): void => {
        validate(req, res, next);
    }
]
