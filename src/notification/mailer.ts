import nodemailer from "nodemailer";
import { failedNotification } from "./templates/admin";

const transporterUser = nodemailer.createTransport({
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

const transporterAdmin = nodemailer.createTransport({
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

const sendEmail = async (template: Function, values: object): Promise<void> => {
    try {
        //await transporterUser.verify();
        await transporterUser.sendMail(template(values));
    } catch (error: any) {
        await transporterAdmin.sendMail(failedNotification(error.message));
    }
}

export default sendEmail;
