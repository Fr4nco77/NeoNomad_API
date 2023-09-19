import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import { CategoryAttributes, optional } from "./interfaces/category";

interface CreationCategoryAttributes extends Optional<CategoryAttributes, optional> { }

@Table({
    tableName: "Categories",
    timestamps: true,
})

export class Category extends Model<CategoryAttributes, CreationCategoryAttributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description!: string

    // @HasMany({

    // })
}