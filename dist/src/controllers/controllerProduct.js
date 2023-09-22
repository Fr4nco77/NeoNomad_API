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
exports.getCategorys = exports.getByID = exports.getAll = void 0;
const Product_1 = require("../dataBase/models/Product");
const Category_1 = require("../dataBase/models/Category");
const sequelize_1 = require("sequelize");
const getAll = (querys) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, sortBy, sortOrder, page, limit } = querys;
    const filters = {};
    if (category) {
        filters.categoryID = category;
    }
    ;
    if (name) {
        filters.name = { [sequelize_1.Op.iLike]: `%${name}%` };
    }
    ;
    const order = [];
    if (sortBy) {
        order.push([sortBy, sortOrder]);
    }
    ;
    const attributes = {
        exclude: ["description", "categoryID", "createdAt", "updatedAt", "deletedAt"]
    };
    const products = yield Product_1.Product.findAndCountAll({
        where: filters,
        order,
        limit: limit ? +limit : undefined,
        offset: page ? (+page - 1) * (+limit || 0) : undefined,
        attributes
    });
    if (!products || products.count === 0)
        throw new Error("No se encontraron productos");
    return products;
});
exports.getAll = getAll;
const getByID = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.Product.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"]
        },
        include: {
            model: Category_1.Category, attributes: ["name", "description"]
        }
    });
    if (!product)
        throw new Error("No se encontro el producto");
    return product;
});
exports.getByID = getByID;
const getCategorys = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.Category.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    if (!categories)
        throw new Error("No se encontraron categorias");
    return categories;
});
exports.getCategorys = getCategorys;
