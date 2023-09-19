"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedNotification = void 0;
const failedNotification = (error) => {
    return {
        from: '"Notificaciones Neo Nomad " <NeoNomadSoporte@outlook.com>',
        to: "NeoNomadSoporte@outlook.com",
        subject: "Error en las notificaciones",
        text: error,
    };
};
exports.failedNotification = failedNotification;
