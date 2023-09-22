import { Product } from "../../dataBase/models/Product";
import { Category } from "../../dataBase/models/Category";
import data from "./data";
import { User } from "../../dataBase/models/User";
import { Order } from "../../dataBase/models/Order";
import { Detail } from "../../dataBase/models/Detail";

const seedProduct = async (): Promise<void> => {
    let index = 1;
    for (const productData of data) {
        const { name, description, image, price, categoria } = productData;

        const [product, created] = await Product.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                image,
                price
            }
        })
        if (!created) continue;

        const [category,] = await Category.findOrCreate({
            where: { name: categoria },
            defaults: { name: categoria }
        });
        await product.$set("category" as keyof Product, category)

        const user = await User.create({
            name: "pepe" + index,
            email: "elpepe" + index + "@gmail.com",
            password: "elpepe37",
            validated: true,
        });
        user.hashPassword();
        await user.save();

        const order = await Order.create({
            status: "Aprovado",
            total: product.price
        })

        const detail = await Detail.create({
            quantity: 1,
            unitPrice: product.price,
            totalPrice: product.price
        })

        await Promise.all([
            order.$set("user" as keyof Order, user),
            order.$add("detail" as keyof Order, detail),
            detail.$set("product" as keyof Detail, product)
        ])

        index++
    }
}

export default seedProduct;
