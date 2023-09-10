import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: 'NeoNomad',
    dialect: 'postgres',
    username: 'postgres',
    password: 'admin',
    host: 'localhost',
    models: [__dirname + '/models']
})

export default sequelize;