import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [__dirname + '/models']
})

const { User, Product, Cart, Category, Detail, Order } = sequelize.models;

Category.hasMany(Product, {
    foreignKey: "categoryID"
});
Product.belongsTo(Category, {
    foreignKey: "categoryID"
});

Product.hasMany(Cart, {
    foreignKey: "productID"
});
Cart.belongsTo(Product, {
    foreignKey: "productID"
});

User.hasMany(Cart, {
    foreignKey: "userID"
});
Cart.belongsTo(User, {
    foreignKey: "userID"
});

Product.hasOne(Detail, {
    foreignKey: "productID"
});
Detail.belongsTo(Product, {
    foreignKey: "productID"
})

Order.hasMany(Detail, {
    foreignKey: "orderID"
})
Detail.belongsTo(Order, {
    foreignKey: "orderID"
})

User.hasMany(Order, {
    foreignKey: "userID"
})
Order.belongsTo(User, {
    foreignKey: "userID"
})

export default sequelize;
