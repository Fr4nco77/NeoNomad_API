"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlerProduct_1 = require("../handlers/handlerProduct");
const routerProduct = (0, express_1.Router)();
routerProduct
    .get("/", handlerProduct_1.getAllProducts)
    .get("/categories", handlerProduct_1.getAllCategories)
    .get("/:id", handlerProduct_1.getProductByID);
exports.default = routerProduct;
