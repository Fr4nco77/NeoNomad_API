import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "Details",
    timestamps: true
})

export class Detail extends Model {
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
            min: 1
        }
    })
    quantity!: number

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    })
    unitPrice!: number

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    })
    totalPrice!: number
}