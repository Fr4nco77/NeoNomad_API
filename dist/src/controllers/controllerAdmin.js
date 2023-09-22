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
exports.changeStatus = exports.getOrderByID = exports.getOrders = exports.bannUser = exports.getUserByID = exports.getUsers = exports.removeProduct = exports.updateProduct = exports.createProduct = exports.login = void 0;
const User_1 = require("../dataBase/models/User");
const Product_1 = require("../dataBase/models/Product");
const Category_1 = require("../dataBase/models/Category");
const Order_1 = require("../dataBase/models/Order");
const Detail_1 = require("../dataBase/models/Detail");
const sequelize_1 = require("sequelize");
const tokenFunctions_1 = require("../utils/tokenFunctions");
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { email } });
    if (!user)
        throw new Error("Email o contraseña incorrecta");
    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword)
        throw new Error("Email o contraseña incorrecta");
    if (user.role !== "admin")
        throw new Error("Email o contraseña incorrecta");
    const token = (0, tokenFunctions_1.generateToken)(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
});
exports.login = login;
const createProduct = ({ name, description, image, price, categoryName }) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.Product.create({
        name,
        description,
        image,
        price
    });
    const [category,] = yield Category_1.Category.findOrCreate({
        where: { name: categoryName },
        defaults: {
            name: categoryName
        }
    });
    yield product.$set("category", category);
    return {
        status: "CREATED",
        message: "Producto creado con exito"
    };
});
exports.createProduct = createProduct;
const updateProduct = ({ product, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image, price, categoryName } = data;
    const updatedProduct = yield product.update({ name, description, image, price });
    if (categoryName) {
        const [category,] = yield Category_1.Category.findOrCreate({
            where: { name: categoryName },
            defaults: {
                name: categoryName
            }
        });
        yield updatedProduct.$set("category", category);
    }
    ;
    return {
        status: "UPDATED",
        message: "Producto actualizado con exito"
    };
});
exports.updateProduct = updateProduct;
const removeProduct = ({ product }) => __awaiter(void 0, void 0, void 0, function* () {
    yield product.destroy();
    return {
        status: "DELETED",
        message: "Producto borrado con exito"
    };
});
exports.removeProduct = removeProduct;
const getUsers = ({ name, lastname, email, localRegistration, validated, isBanned, sortBy, sortOrder, page, limit }) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        role: "user"
    };
    if (name !== undefined && name !== null) {
        filters.name = { [sequelize_1.Op.iLike]: `%${name}%` };
    }
    if (lastname !== undefined && lastname !== null) {
        filters.lastname = { [sequelize_1.Op.iLike]: `%${lastname}%` };
    }
    if (email !== undefined && email !== null) {
        filters.email = { [sequelize_1.Op.iLike]: `%${email}%` };
    }
    if (localRegistration !== undefined && localRegistration !== null) {
        filters.localRegistration = localRegistration;
    }
    if (validated !== undefined && validated !== null) {
        filters.validated = validated;
    }
    if (isBanned !== undefined && isBanned !== null) {
        filters.isBanned = isBanned;
    }
    const order = [];
    if (sortBy !== undefined && sortOrder !== undefined) {
        order.push([sortBy, sortOrder]);
    }
    const users = yield User_1.User.findAndCountAll({
        where: filters,
        order,
        limit: limit ? +limit : undefined,
        offset: page ? (+page - 1) * (+limit || 0) : undefined,
        attributes: {
            exclude: ["password", "resetToken", "role", "phone", "address"]
        }
    });
    if (!users || users.count === 0) {
        throw new Error("No se encontraron usuarios");
    }
    return users;
});
exports.getUsers = getUsers;
const getUserByID = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(id, {
        attributes: {
            exclude: ["password", "resetToken"]
        },
        include: [
            {
                model: Order_1.Order,
                attributes: {
                    exclude: ["userID"]
                },
                include: [
                    {
                        model: Detail_1.Detail,
                        attributes: {
                            exclude: ["orderID", "productID"]
                        },
                        include: [
                            {
                                model: Product_1.Product,
                                attributes: {
                                    exclude: ["description", "createdAt", "updatedAt", "deletedAt", "categoryID"]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
    if (!user)
        throw new Error("No se encontro al usuario");
    return user;
});
exports.getUserByID = getUserByID;
const bannUser = ({ user }) => __awaiter(void 0, void 0, void 0, function* () {
    const userUpdated = yield user.update({ isBanned: !user.isBanned });
    //Aqui se envia el emai debaneo.
    return {
        status: "DELETED",
        message: "Usuario baneado con exito"
    };
});
exports.bannUser = bannUser;
const getOrders = ({ status, sortBy, sortOrder, page, limit }) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    if (status)
        filters.status = status;
    const order = [];
    if (sortBy !== undefined && sortOrder !== undefined) {
        order.push([sortBy, sortOrder]);
    }
    const orders = yield Order_1.Order.findAndCountAll({
        where: filters,
        order,
        limit: limit ? +limit : undefined,
        offset: page ? (+page - 1) * (+limit || 0) : undefined,
        attributes: {
            exclude: ["userID"]
        },
    });
    if (!orders || orders.count === 0) {
        throw new Error("No se encontraron ordenes");
    }
    return orders;
});
exports.getOrders = getOrders;
const getOrderByID = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.Order.findByPk(id, {
        attributes: {
            exclude: ["userID"]
        },
        include: [
            {
                model: User_1.User,
                attributes: ["id", "name", "lastname", "image"]
            },
            {
                model: Detail_1.Detail,
                attributes: {
                    exclude: ["orderID", "productID"]
                },
                include: [
                    {
                        model: Product_1.Product,
                        attributes: {
                            exclude: ["description", "createdAt", "updatedAt", "deletedAt", "categoryID"]
                        }
                    }
                ]
            }
        ]
    });
    if (!order)
        throw new Error("No se encontro la orden de compra");
    return order;
});
exports.getOrderByID = getOrderByID;
const changeStatus = ({ order, status }) => __awaiter(void 0, void 0, void 0, function* () {
    yield order.update({ status });
    return {
        status: "UPDATED",
        message: "Orden actualizada con exito"
    };
});
exports.changeStatus = changeStatus;
