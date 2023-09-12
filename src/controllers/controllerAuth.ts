import { User } from "../dataBase/models/User";
import { RegisterParameters, LoginParameters } from "./interfaces/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, password }: RegisterParameters): Promise<string> => {
    const passwordHashed = await bcrypt.hash(password, 9);

    const user = await User.create({ name, email, password: passwordHashed });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: "12h" })

    return token;
}

export const login = async ({ email }: LoginParameters): Promise<string> => {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ id: user!.id }, process.env.SECRET_KEY as string, { expiresIn: "12h" })

    return token;
}

export const thirdParty = async ({ email }: { email: string }): Promise<string> => {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ id: user!.id }, process.env.SECRET_KEY as string, { expiresIn: "12h" })

    return token;
}