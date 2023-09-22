"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlerCart_1 = require("../handlers/handlerCart");
const validateToken_1 = require("../middlewares/validateToken");
const validateProductID_1 = require("../middlewares/validateProductID");
const validateCart_1 = require("../middlewares/validateCart");
const routerCart = (0, express_1.Router)();
routerCart
    .get("/", validateToken_1.validateUserAuthorization, handlerCart_1.getProducts)
    .post("/add", validateToken_1.validateUserAuthorization, validateProductID_1.validateProductID, validateCart_1.validateQuantity, handlerCart_1.addProduct)
    .delete("/remove", validateToken_1.validateUserAuthorization, validateProductID_1.validateProductID, handlerCart_1.removeProduct);
exports.default = routerCart;
