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
exports.updateData = exports.getOrders = exports.getData = void 0;
const User_1 = require("../dataBase/models/User");
const Order_1 = require("../dataBase/models/Order");
const Detail_1 = require("../dataBase/models/Detail");
const Product_1 = require("../dataBase/models/Product");
const getData = ({ userID }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(userID, {
        attributes: {
            exclude: ["password", "resetToken", "deletedAt"]
        },
    });
    if (!user)
        throw new Error("El usuario no existe");
    return user;
});
exports.getData = getData;
const getOrders = ({ userID }) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.Order.findAll({
        where: { userID },
        attributes: ["createdAt", "status", "total"],
        include: [
            {
                model: Detail_1.Detail,
                attributes: ["quantity", "unitPrice", "totalPrice"],
                include: [
                    {
                        model: Product_1.Product,
                        attributes: ["id", "name", "description", "image"],
                    },
                ],
            },
        ]
    });
    if (!orders.length)
        throw new Error("No hay ordenes de compra");
    return orders;
});
exports.getOrders = getOrders;
const updateData = ({ userID, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const [affectedCount] = yield User_1.User.update(data, { where: { id: userID } });
    if (!affectedCount)
        throw new Error("No se actualizo ninguna valor");
    return {
        status: "UPDATED",
        message: "Actualizado con éxito"
    };
});
exports.updateData = updateData;
