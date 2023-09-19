import { Model, Table, Column, DataType } from "sequelize-typescript";
import { Optional } from "sequelize";
import {UserAttributes, optional} from "./interfaces/user";
import bcrypt from "bcryptjs";

interface UserCreationAttributes extends Optional<UserAttributes, optional> { }

@Table({
    tableName: "Users",
    timestamps: true,
    paranoid: true,
})


export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "https://th.bing.com/th/id/OIG.mU_R3nUMq9qO3So01JsR?w=270&h=270&c=6&r=0&o=5&pid=ImgGn",
        validate: {
            isUrl: true
        }
    })
    image!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    lastname!: string

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: ["admin", "user"],
        defaultValue: "user"
    })
    role!: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phone!: string

    @Column({
        type: DataType.JSON,
        allowNull: true
    })
    address!: object

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password!: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    localRegistration!: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    validated!: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isBanned!: boolean

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    resetToken!: string

    public hashPassword() {
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword;
    }

    public comparePassword(password: string) {
        const isValidPassword = bcrypt.compareSync(password, this.password)
        return isValidPassword;
    }
}