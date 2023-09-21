import { Product } from "../../dataBase/models/Product";
import { Category } from "../../dataBase/models/Category";
import data from "./data";

const seedProduct = async (): Promise<void> => {
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
    }
}

export default seedProduct;
