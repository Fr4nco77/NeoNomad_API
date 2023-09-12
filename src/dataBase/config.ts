import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [__dirname + '/models']
})

export default sequelize;