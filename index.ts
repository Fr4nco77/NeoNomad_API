import app from "./src/app";
import sequelize from "./src/dataBase/config";
import seedProduct from "./src/seeds/products/seedProduct";
import seedAdmin from "./src/seeds/admin/seedAdmin";

sequelize.sync({ force: true }).then(async () => {

    await seedProduct();
    await seedAdmin();

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server on port ${process.env.SERVER_PORT}`)
    })
})
