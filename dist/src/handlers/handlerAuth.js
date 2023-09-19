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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendPasswordResetEmail = exports.validateEmail = exports.OAuth = exports.signIn = exports.signUp = void 0;
const controllerAuth_1 = require("../controllers/controllerAuth");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAuth_1.register)(req.body);
        res.status(201).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAuth_1.login)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "Email o contraseña incorrecta" ||
            error.message === "Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.signIn = signIn;
const OAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, controllerAuth_1.byGoogle)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        if (error.message === "Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.OAuth = OAuth;
const validateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, controllerAuth_1.validator)(req.params);
        res.redirect("http://localhost:5173/");
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.validateEmail = validateEmail;
const sendPasswordResetEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAuth_1.passwordResetEmail)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "Este email no esta registrado") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAuth_1.passwordReset)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "El token proporcionado es invalido") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.resetPassword = resetPassword;
