"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const timeToExpire = "12h";
const generateToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, { expiresIn: timeToExpire });
    return token;
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    return data;
};
exports.decodeToken = decodeToken;
