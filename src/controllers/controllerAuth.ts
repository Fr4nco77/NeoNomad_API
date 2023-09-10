import { User } from "../dataBase/models/User";
import { RegisterParameters } from "./interfaces/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, password }: RegisterParameters): Promise<string> => {
    const passwordHashed = await bcrypt.hash(password, 9);

    const user = await User.create({ name, email, password: passwordHashed });
    const token = jwt.sign({ id: user.id }, "Elpepe", { expiresIn: "12h" })

    return token ;
}