import { Product } from "../dataBase/models/Product";
import { Category } from "../dataBase/models/Category";
import { Op } from "sequelize";
import { querys } from "./interfaces/product";

export const getAll = async (querys: querys): Promise<object> => {
    const { name, category, sortBy, sortOrder, page, limit } = querys

    const filters: Record<string, any> = {};

    if (category) {
        filters.categoryID = category;
    };

    if (name) {
        filters.name = { [Op.iLike]: `%${name}%` };
    };

    const order: any = [];

    if (sortBy) {
        order.push([sortBy, sortOrder])
    };

    const attributes = {
        exclude: ["description", "categoryID", "createdAt", "updatedAt", "deletedAt"]
    }

    const products = await Product.findAndCountAll({
        where: filters,
        order,
        limit: limit ? +limit : undefined,
        offset: page ? (+page - 1) * (+limit || 0) : undefined,
        attributes
    });
    if (!products || products.count === 0) throw new Error("No se encontraron productos");

    return products;
}

export const getByID = async ({ id }: { id: string }): Promise<Product> => {
    const product = await Product.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"]
        },
        include: {
            model: Category, attributes: ["name", "description"]
        }
    });
    if (!product) throw new Error("No se encontro el producto");

    return product;
}

export const getCategorys = async (): Promise<Array<Category>> => {
    const categories = await Category.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    if (!categories) throw new Error("No se encontraron categorias");

    return categories;
}
