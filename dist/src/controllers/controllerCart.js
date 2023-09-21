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
exports.get = exports.remove = exports.add = void 0;
const User_1 = require("../dataBase/models/User");
const Product_1 = require("../dataBase/models/Product");
const Cart_1 = require("../dataBase/models/Cart");
const add = ({ userID, productID, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findOne({ where: { userID, productID } });
    if (!cart) {
        return yield createCart(userID, productID, quantity);
    }
    else {
        return yield updateCart(cart, quantity);
    }
});
exports.add = add;
const remove = ({ userID, productID }) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findOne({
        where: { userID, productID },
    });
    if (!cart)
        throw new Error("El producto no se encontró en el carrito");
    yield cart.destroy();
    return {
        status: "DELETED",
        message: "Producto eliminado del carrito con éxito",
    };
});
exports.remove = remove;
const get = ({ userID }) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findAll({
        where: { userID },
        attributes: {
            exclude: ["createdAt", "updatedAt", "productID", "userID"]
        },
        include: [
            {
                model: Product_1.Product,
                attributes: { exclude: ["description", "categoryID", "createdAt", "updatedAt", "deletedAt"] }
            },
        ],
    });
    if (!cart.length)
        throw new Error("El carrito esta vacio");
    return cart;
});
exports.get = get;
const createCart = (userID, productID, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const [cart, user, product] = yield Promise.all([
        Cart_1.Cart.create({ quantity }),
        User_1.User.findByPk(userID),
        Product_1.Product.findByPk(productID)
    ]);
    if (!user || !product) {
        throw new Error("Usuario o producto no encontrado");
    }
    yield Promise.all([
        cart.$set("user", user),
        cart.$set("product", product),
    ]);
    return {
        status: "CREATED",
        message: "Producto agregado con éxito"
    };
});
const updateCart = (cart, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const currentQuantity = cart.quantity;
    const newQuantity = currentQuantity + quantity;
    if (newQuantity < 0)
        throw new Error("La cantidad no puede ser negativa");
    yield cart.update({ quantity: newQuantity });
    return {
        status: "UPDATED",
        message: "Cantidad actualizada con exito",
    };
});
