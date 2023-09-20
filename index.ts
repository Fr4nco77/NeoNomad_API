import app from "./src/app";
import sequelize from "./src/dataBase/config";
import seedProduct from "./src/seeds/products/seedProduct";

sequelize.sync({ force: true }).then(async () => {

    await seedProduct();

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server on port ${process.env.SERVER_PORT}`)
    })
})
