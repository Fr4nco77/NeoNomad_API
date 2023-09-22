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
exports.deleteProduct = exports.putProduct = exports.postProduct = exports.updateStatusOrder = exports.getOrder = exports.getAllOrders = exports.bannUsers = exports.getUser = exports.getAllUsers = exports.loginAdmin = void 0;
const controllerAdmin_1 = require("../controllers/controllerAdmin");
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.login)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "Email o contraseña incorrecta") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.loginAdmin = loginAdmin;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, controllerAdmin_1.getUsers)(req.query);
        res.status(200).json(users);
    }
    catch (error) {
        if (error.message === "No se encontraron usuarios") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, controllerAdmin_1.getUserByID)(req.params);
        res.status(200).json(user);
    }
    catch (error) {
        if (error.message === "No se encontro al usuario") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getUser = getUser;
const bannUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.bannUser)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.bannUsers = bannUsers;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, controllerAdmin_1.getOrders)(req.query);
        res.status(200).json(orders);
    }
    catch (error) {
        if (error.message === "No se encontraron ordenes") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getAllOrders = getAllOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, controllerAdmin_1.getOrderByID)(req.params);
        res.status(200).json(order);
    }
    catch (error) {
        if (error.message === "No se encontro la orden de compra") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getOrder = getOrder;
const updateStatusOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.changeStatus)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateStatusOrder = updateStatusOrder;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.createProduct)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.updateProduct)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.putProduct = putProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerAdmin_1.removeProduct)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
