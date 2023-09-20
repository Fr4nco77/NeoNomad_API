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
exports.getAllCategories = exports.getProductByID = exports.getAllProducts = void 0;
const controllerProduct_1 = require("../controllers/controllerProduct");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, controllerProduct_1.getAll)(req.query);
        res.status(200).json(products);
    }
    catch (error) {
        if (error.message === "No se encontraron productos") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getAllProducts = getAllProducts;
const getProductByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, controllerProduct_1.getByID)(req.params);
        res.status(200).json(product);
    }
    catch (error) {
        if (error.message === "No se encontro el producto") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getProductByID = getProductByID;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, controllerProduct_1.getCategorys)();
        res.status(200).json(categories);
    }
    catch (error) {
        if (error.message === "No se encontraron categorias") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getAllCategories = getAllCategories;
