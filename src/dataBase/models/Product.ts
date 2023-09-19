import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { ProductAttributes, optional } from "./interfaces/product";

interface ProductCreationAttributes extends Optional<ProductAttributes, optional> { }

@Table({
    tableName: "Products",
    timestamps: true,
    paranoid: true
})

export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    })
    image!: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    })
    price!: number

    // @BelongsTo({

    // })
}