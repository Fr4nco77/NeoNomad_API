import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "Products",
    timestamps: true,
    paranoid: true
})

export class Product extends Model {
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

}
