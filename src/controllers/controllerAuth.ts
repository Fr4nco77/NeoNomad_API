import { User } from "../dataBase/models/User";
import { RegisterParameters, LoginParameters } from "./interfaces/auth";
import { generateToken } from "../utils/tokenFunctions";
import { getUserInfo } from "../utils/googleFuntions";
import { validateUser, resetPassword } from "../notification/templates/auth";
import sendEmail from "../notification/mailer";

export const register = async ({ name, email, password }: RegisterParameters): Promise<object> => {
    const user = await User.create({ name, email, password });
    user.hashPassword();
    await user.save();

    await sendEmail(validateUser, { id: user.id, email, name });

    return {
        name,
        email,
        status: "CREATED",
        message: "¡Gracias por registrarte! Para poder seguir adelante, necesitamos que valides tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones en el correo electrónico que te hemos enviado. Si no encuentras el correo electrónico, revisa también la carpeta de spam. ¡Esperamos verte pronto en nuestra plataforma!"
    };
}

export const login = async ({ email, password }: LoginParameters): Promise<object> => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Email o contraseña incorrecta");

    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) throw new Error("Email o contraseña incorrecta");

    if (user.isBanned) throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");

    if (!user.validated) {
        await sendEmail(validateUser, { id: user.id, email, name: user.name });
        return {
            status: "UNAUTHORIZED",
            message: "Para poder continuar debes validar tu email"
        };
    }
    const token = generateToken(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
}

export const byGoogle = async ({ code }: { code: string }): Promise<object> => {
    const { email, name, picture }: any = await getUserInfo(code);

    const [user,] = await User.findOrCreate({
        where: { email },
        defaults: {
            email,
            name,
            image: picture,
            validated: true,
            localRegistration: false,
        }
    });
    if (user.isBanned) throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");

    const token = generateToken(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
}

export const validator = async ({ id }: { id: string }): Promise<void> => {
    await User.update({ validated: true }, { where: { id } });
}

export const passwordResetEmail = async ({ email }: { email: string }): Promise<object> => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Este email no esta registrado");

    const token = generateToken(user.id);
    await user.update({ resetToken: token });

    await sendEmail(resetPassword, { email, name: user.name, token });

    return {
        status: "OK",
        message: "Email enviado con exito",
    };
};

export const passwordReset = async ({ token, newPassword }: { token: string, newPassword: string }): Promise<object> => {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) throw new Error("El token proporcionado es invalido");

    await user.update({ password: newPassword, resetToken: undefined });
    user.hashPassword();
    await user.save();

    return {
        status: "OK",
        message: "Contraseña restablecida",
    }
}
