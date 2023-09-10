import app from "./src/app";
import sequelize from "./src/dataBase/config";

sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server on port ${process.env.SERVER_PORT}`)
    })
})
