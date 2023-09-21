import { User } from "../dataBase/models/User";
import { Order } from "../dataBase/models/Order";
import { Detail } from "../dataBase/models/Detail";
import { Product } from "../dataBase/models/Product";

export const getData = async ({ userID }: { userID: string }): Promise<object> => {
    const user = await User.findByPk(userID, {
        attributes: {
            exclude: ["password", "resetToken", "deletedAt"]
        },
    });
    if (!user) throw new Error("El usuario no existe");

    return user;
}

export const getOrders = async ({ userID }: { userID: string }): Promise<object> => {
    const orders = await Order.findAll({
        where: { userID },
        attributes: ["createdAt", "status", "total"],
        include: [
            {
                model: Detail,
                attributes: ["quantity", "unitPrice", "totalPrice"],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "name", "description", "image"],
                    },
                ],
            },
        ]
    })
    if (!orders.length) throw new Error("No hay ordenes de compra");

    return orders;
}

export const updateData = async ({ userID, data }: { userID: string, data: object }): Promise<object> => {
    const [affectedCount] = await User.update(data, { where: { id: userID } });
    if (!affectedCount) throw new Error("No se actualizo ninguna valor");

    return {
        status: "UPDATED",
        message: "Actualizado con éxito"
    }
}
