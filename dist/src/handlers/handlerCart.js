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
exports.getProducts = exports.removeProduct = exports.addProduct = void 0;
const controllerCart_1 = require("../controllers/controllerCart");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerCart_1.add)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "Usuario o producto no encontrado") {
            res.status(404).json({ error: error.message });
        }
        else if (error.message === "La cantidad no puede ser negativa") {
            res.status(406).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.addProduct = addProduct;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield (0, controllerCart_1.remove)(req.body);
        res.status(200).json(status);
    }
    catch (error) {
        if (error.message === "El producto no se encontró en el carrito") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.removeProduct = removeProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield (0, controllerCart_1.get)(req.body);
        res.status(200).json(cart);
    }
    catch (error) {
        if (error.message === "El carrito esta vacio") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getProducts = getProducts;
