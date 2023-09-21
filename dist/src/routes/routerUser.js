"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlerUser_1 = require("../handlers/handlerUser");
const validateToken_1 = require("../middlewares/validateToken");
const validateUser_1 = require("../middlewares/validateUser");
const routerUser = (0, express_1.Router)();
routerUser
    .get("/", validateToken_1.validateUserAuthorization, handlerUser_1.getUserData)
    .get("/orders", validateToken_1.validateUserAuthorization, handlerUser_1.getOrdersData)
    .put("/update", validateToken_1.validateUserAuthorization, validateUser_1.validateUpdateData, handlerUser_1.updateUserData);
exports.default = routerUser;
