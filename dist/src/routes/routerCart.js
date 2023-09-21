"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handler_Cart_1 = require("../handlers/handler Cart");
const validateToken_1 = require("../middlewares/validateToken");
const validateProductID_1 = require("../middlewares/validateProductID");
const validateCart_1 = require("../middlewares/validateCart");
const routerCart = (0, express_1.Router)();
routerCart
    .get("/", validateToken_1.validateUserAuthorization, handler_Cart_1.getProducts)
    .post("/add", validateToken_1.validateUserAuthorization, validateProductID_1.validateProductID, validateCart_1.validateQuantity, handler_Cart_1.addProduct)
    .delete("/remove", validateToken_1.validateUserAuthorization, validateProductID_1.validateProductID, handler_Cart_1.removeProduct);
exports.default = routerCart;
