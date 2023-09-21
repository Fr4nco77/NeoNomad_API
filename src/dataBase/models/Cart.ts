import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "Carts",
    timestamps: true
})

export class Cart extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    })
    quantity!: number
} 
