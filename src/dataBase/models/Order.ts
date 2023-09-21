import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "Orders",
    timestamps: true
})

export class Order extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id!: string

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: ["Pendiente", "Cancelado", "Aprovado"],
        defaultValue: "Pendiente",
    })
    status!: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 1,
        },
    })
    total!: number
}