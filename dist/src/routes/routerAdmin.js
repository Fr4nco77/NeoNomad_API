"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlerAdmin_1 = require("../handlers/handlerAdmin");
const validateToken_1 = require("../middlewares/validateToken");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const routerAdmin = (0, express_1.Router)();
routerAdmin
    .post("/signin", validateAdmin_1.validateSignIn, handlerAdmin_1.loginAdmin)
    .get("/user/all", validateToken_1.validateAdminAuthorization, handlerAdmin_1.getAllUsers)
    .put("/user/bann/:id", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateBann, handlerAdmin_1.bannUsers)
    .get("/user/:id", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateParamID, handlerAdmin_1.getUser)
    .get("/order/all", validateToken_1.validateAdminAuthorization, handlerAdmin_1.getAllOrders)
    .put("/order/update/status", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateStatusOrder, handlerAdmin_1.updateStatusOrder)
    .get("/order/:id", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateParamID, handlerAdmin_1.getOrder)
    .post("/product/create", validateToken_1.validateAdminAuthorization, validateAdmin_1.validatePostProduct, handlerAdmin_1.postProduct)
    .put("/product/update", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateUpdateProduct, handlerAdmin_1.putProduct)
    .delete("/product/delete/:id", validateToken_1.validateAdminAuthorization, validateAdmin_1.validateRemoveProduct, handlerAdmin_1.deleteProduct);
exports.default = routerAdmin;
