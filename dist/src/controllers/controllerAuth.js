"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.passwordResetEmail = exports.validator = exports.byGoogle = exports.login = exports.register = void 0;
const User_1 = require("../dataBase/models/User");
const tokenFunctions_1 = require("../utils/tokenFunctions");
const googleFuntions_1 = require("../utils/googleFuntions");
const auth_1 = require("../notification/templates/auth");
const mailer_1 = __importDefault(require("../notification/mailer"));
const register = ({ name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.create({ name, email, password });
    user.hashPassword();
    yield user.save();
    yield (0, mailer_1.default)(auth_1.validateUser, { id: user.id, email, name });
    return {
        name,
        email,
        status: "CREATED",
        message: "¡Gracias por registrarte! Para poder seguir adelante, necesitamos que valides tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones en el correo electrónico que te hemos enviado. Si no encuentras el correo electrónico, revisa también la carpeta de spam. ¡Esperamos verte pronto en nuestra plataforma!"
    };
});
exports.register = register;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { email } });
    if (!user)
        throw new Error("Email o contraseña incorrecta");
    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword)
        throw new Error("Email o contraseña incorrecta");
    if (user.isBanned)
        throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");
    if (!user.validated) {
        yield (0, mailer_1.default)(auth_1.validateUser, { id: user.id, email, name: user.name });
        return {
            status: "UNAUTHORIZED",
            message: "Para poder continuar debes validar tu email"
        };
    }
    const token = (0, tokenFunctions_1.generateToken)(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
});
exports.login = login;
const byGoogle = ({ code }) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, picture } = yield (0, googleFuntions_1.getUserInfo)(code);
    const [user,] = yield User_1.User.findOrCreate({
        where: { email },
        defaults: {
            email,
            name,
            image: picture,
            validated: true,
            localRegistration: false,
        }
    });
    if (user.isBanned)
        throw new Error("Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas");
    const token = (0, tokenFunctions_1.generateToken)(user.id);
    return {
        status: "OK",
        authorization: `Bearer ${token}`
    };
});
exports.byGoogle = byGoogle;
const validator = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.update({ validated: true }, { where: { id } });
});
exports.validator = validator;
const passwordResetEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { email } });
    if (!user)
        throw new Error("Este email no esta registrado");
    const token = (0, tokenFunctions_1.generateToken)(user.id);
    yield user.update({ resetToken: token });
    yield (0, mailer_1.default)(auth_1.resetPassword, { email, name: user.name, token });
    return {
        status: "OK",
        message: "Email enviado con exito",
    };
});
exports.passwordResetEmail = passwordResetEmail;
const passwordReset = ({ token, newPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { resetToken: token } });
    if (!user)
        throw new Error("El token proporcionado es invalido");
    yield user.update({ password: newPassword, resetToken: undefined });
    user.hashPassword();
    yield user.save();
    return {
        status: "OK",
        message: "Contraseña restablecida",
    };
});
exports.passwordReset = passwordReset;
