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
exports.updateUserData = exports.getOrdersData = exports.getUserData = void 0;
const controllerUser_1 = require("../controllers/controllerUser");
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, controllerUser_1.getData)(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        if (error.message === "El usuario no existe") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getUserData = getUserData;
const getOrdersData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, controllerUser_1.getOrders)(req.body);
        res.status(200).json(orders);
    }
    catch (error) {
        if (error.message === "No hay ordenes de compra") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getOrdersData = getOrdersData;
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerUser_1.updateData)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "No se actualizo ninguna valor") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.updateUserData = updateUserData;
