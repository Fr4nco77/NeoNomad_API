import { User } from "../dataBase/models/User";
import { Product } from "../dataBase/models/Product";
import { Cart } from "../dataBase/models/Cart";
import { cartParameters, addToCartParameters } from "./interfaces/cart";

export const add = async ({ userID, productID, quantity }: addToCartParameters): Promise<object> => {
    const cart = await Cart.findOne({ where: { userID, productID } });
    if (!cart) {
        return await createCart(userID, productID, quantity);
    } else {
        return await updateCart(cart, quantity);
    }
}

export const remove = async ({ userID, productID }: cartParameters): Promise<object> => {
    const cart = await Cart.findOne({
        where: { userID, productID },
    });
    if (!cart) throw new Error("El producto no se encontró en el carrito");

    await cart.destroy();
    return {
        status: "DELETED",
        message: "Producto eliminado del carrito con éxito",
    };
}

export const get = async ({ userID }: { userID: string }): Promise<Cart[]> => {
    const cart = await Cart.findAll({
        where: { userID },
        attributes: {
            exclude: ["createdAt", "updatedAt", "productID", "userID"]
        },
        include: [
            {
                model: Product,
                attributes: { exclude: ["description", "categoryID", "createdAt", "updatedAt", "deletedAt"] }
            },
        ],
    });
    if (!cart.length) throw new Error("El carrito esta vacio");

    return cart;
}

const createCart = async (userID: string, productID: string, quantity: number): Promise<object> => {
    const [cart, user, product] = await Promise.all([
        Cart.create({ quantity }),
        User.findByPk(userID),
        Product.findByPk(productID)
    ])
    if (!user || !product) {
        throw new Error("Usuario o producto no encontrado");
    }

    await Promise.all([
        cart.$set("user" as keyof Cart, user),
        cart.$set("product" as keyof Cart, product),
    ])

    return {
        status: "CREATED",
        message: "Producto agregado con éxito"
    }
}

const updateCart = async (cart: Cart, quantity: number): Promise<object> => {
    const currentQuantity = cart.quantity;
    const newQuantity = currentQuantity + quantity;
    if (newQuantity < 0) throw new Error("La cantidad no puede ser negativa")

    await cart.update({ quantity: newQuantity })
    return {
        status: "UPDATED",
        message: "Cantidad actualizada con exito",
    }
}