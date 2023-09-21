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
const nodemailer_1 = __importDefault(require("nodemailer"));
const admin_1 = require("./templates/admin");
const transporterUser = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'NeoNomad981@outlook.com',
        pass: process.env.TRANSPORTER_USER
    }
});
const transporterAdmin = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'NeoNomadSoporte@outlook.com',
        pass: process.env.TRANSPORTER_ADMIN
    }
});
const sendEmail = (template, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporterUser.verify();
        yield transporterUser.sendMail(template(values));
    }
    catch (error) {
        yield transporterAdmin.sendMail((0, admin_1.failedNotification)(error.message));
    }
});
exports.default = sendEmail;
