"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlerAuth_1 = require("../handlers/handlerAuth");
const validateAuth_1 = require("../middlewares/validateAuth");
const routerAuth = (0, express_1.Router)();
routerAuth
    .post("/local/signUp", validateAuth_1.validateSignUp, handlerAuth_1.signUp)
    .post("/local/signIn", validateAuth_1.validateSignIn, handlerAuth_1.signIn)
    .post("/OAuth", validateAuth_1.validateOAuth, handlerAuth_1.OAuth)
    .get("/validate/:id", handlerAuth_1.validateEmail)
    .get("/send/resetPassword", validateAuth_1.validateSendReset, handlerAuth_1.sendPasswordResetEmail)
    .put("/resetPassword", validateAuth_1.validateResetPassword, handlerAuth_1.resetPassword);
exports.default = routerAuth;
