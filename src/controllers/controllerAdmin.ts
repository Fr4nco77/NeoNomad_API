import { User } from "../dataBase/models/User";
import { Product } from "../dataBase/models/Product";
import { Category } from "../dataBase/models/Category";
import { Order } from "../dataBase/models/Order";
import { Detail } from "../dataBase/models/Detail";
import { ProductAttributes, QuerysUser, QuerysOrder } from "./interfaces/admin";
import { Op } from "sequelize";
import { generateToken } from "../utils/tokenFunctions";

export const login = async ({ email, password }: { email: string, password: string }): Promise<object> => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Email o contraseña incorrecta");

    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) throw new Error("Email o contraseña incorrecta");
    if (user.role !== "admin") throw new Error("Email o contraseña incorrecta");

    const token = generateToken(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
};

export const createProduct = async ({ name, description, image, price, categoryName }: ProductAttributes): Promise<object> => {
    const product = await Product.create({
        name,
        description,
        image,
        price
    });

    const [category,] = await Category.findOrCreate({
        where: { name: categoryName },
        defaults: {
            name: categoryName
        }
    });

    await product.$set("category" as keyof Product, category);

    return {
        status: "CREATED",
        message: "Producto creado con exito"
    };
};

export const updateProduct = async ({ product, data }: { product: Product, data: ProductAttributes }): Promise<object> => {
    const { name, description, image, price, categoryName } = data;

    const updatedProduct = await product.update({ name, description, image, price });

    if (categoryName) {
        const [category,] = await Category.findOrCreate({
            where: { name: categoryName },
            defaults: {
                name: categoryName
            }
        });
        await updatedProduct.$set("category" as keyof Product, category);
    };

    return {
        status: "UPDATED",
        message: "Producto actualizado con exito"
    };
};

export const removeProduct = async ({ product }: { product: Product }): Promise<object> => {
    await product.destroy();
    return {
        status: "DELETED",
        message: "Producto borrado con exito"
    };
};

export const getUsers = async ({ name, lastname, email, localRegistration, validated, isBanned, sortBy, sortOrder, page, limit }: QuerysUser): Promise<{ rows: User[], count: number }> => {
    const filters: Record<string, any> = {
        role: "user"
    };

    if (name !== undefined && name !== null) {
        filters.name = { [Op.iLike]: `%${name}%` };
    }
    if (lastname !== undefined && lastname !== null) {
        filters.lastname = { [Op.iLike]: `%${lastname}%` };
    }
    if (email !== undefined && email !== null) {
        filters.email = { [Op.iLike]: `%${email}%` };
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

    const order: any = [];
    if (sortBy !== undefined && sortOrder !== undefined) {
        order.push([sortBy, sortOrder]);
    }

    const users = await User.findAndCountAll({
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
}

export const getUserByID = async ({ id }: { id: string }): Promise<User> => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password", "resetToken"]
        },
        include: [
            {
                model: Order,
                attributes: {
                    exclude: ["userID"]
                },
                include: [
                    {
                        model: Detail,
                        attributes: {
                            exclude: ["orderID", "productID"]
                        },
                        include: [
                            {
                                model: Product,
                                attributes: {
                                    exclude: ["description", "createdAt", "updatedAt", "deletedAt", "categoryID"]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    })
    if (!user) throw new Error("No se encontro al usuario");

    return user;
}

export const bannUser = async ({ user }: { user: User }): Promise<object> => {
    const userUpdated = await user.update({ isBanned: !user.isBanned })

    //Aqui se envia el emai debaneo.

    return {
        status: "DELETED",
        message: "Usuario baneado con exito"
    }
}

export const getOrders = async ({ status, sortBy, sortOrder, page, limit }: QuerysOrder): Promise<any> => {
    const filters: Record<string, any> = {};
    if (status) filters.status = status;

    const order: any = [];
    if (sortBy !== undefined && sortOrder !== undefined) {
        order.push([sortBy, sortOrder]);
    }

    const orders = await Order.findAndCountAll({
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
}

export const getOrderByID = async ({ id }: { id: string }): Promise<Order> => {
    const order = await Order.findByPk(id, {
        attributes: {
            exclude: ["userID"]
        },
        include: [
            {
                model: User,
                attributes: ["id", "name", "lastname", "image"]
            },
            {
                model: Detail,
                attributes: {
                    exclude: ["orderID", "productID"]
                },
                include: [
                    {
                        model: Product,
                        attributes: {
                            exclude: ["description", "createdAt", "updatedAt", "deletedAt", "categoryID"]
                        }
                    }
                ]
            }
        ]
    })
    if(!order) throw new Error("No se encontro la orden de compra");

    return order;
}

export const changeStatus = async ({ order, status }: { order: Order, status: string }): Promise<object> => {
    await order.update({ status });
    return {
        status: "UPDATED",
        message: "Orden actualizada con exito"
    }
}