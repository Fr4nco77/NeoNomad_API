export const failedNotification = (error: string): object => {
    return {
        from: '"Notificaciones Neo Nomad " <NeoNomadSoporte@outlook.com>',
        to: "NeoNomadSoporte@outlook.com",
        subject: "Error en las notificaciones",
        text: error,
    }
}