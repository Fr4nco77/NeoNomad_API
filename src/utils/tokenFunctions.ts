import jwt from "jsonwebtoken";

const timeToExpire = "12h";

export const generateToken = (id: string): string => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: timeToExpire });
    return token;
}

export const decodeToken = (token: string): jwt.JwtPayload | string => {
    const data = jwt.verify(token, process.env.SECRET_KEY as string);
    return data;
}
