/**
 * @swagger
 * /auth/local/signUp:
 *  post:
 *    summary: Registra un Usuario con informacion local
 *    description: Para registrar un usuario con informacion local debes enviar por body las props "name", "email" y "password", estas deben ser strings con data valida. Es importante resaltar que en caso de que ya exista un usuario registrado con el mismo email tirara error. Despues de creado el usuario se enviara un email de validacion al nuevo usuario.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: Se creo el usuario y se envio el email de validacion con exito.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado por body es invalido o inexistente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  properties:
 *                    NombreDelDatoInvalido:
 *                      type: string
 *      500:
 *        description: Se genero un error dentro del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

/**
 * @swagger
 * /auth/local/signIn:
 *  post:
 *    summary: Autentica un usuario
 *    description: Verifica si el usuario existe y las credenciasles son correctas, y en caso de que el usuario no este validado enviara un email de validacion. Este endpoint espera que le pasen por body las props "email" y "password".
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Se verifico que el usuario esta registrado. Si esta validado devolvera las props "status" y "authorization", y en caso de que no este validado en ves de "authorization" devolvera la prop "message".
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                authorization:
 *                  type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado por body es invalido o inexistente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  properties:
 *                    NombreDelDatoInvalido:
 *                      type: string
 *      401:
 *        description: Se genero un error debido a que las credenciales del usuario son incorrectas o que el usuario este baneado.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Se genero un error dentro del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

/**
 * @swagger
 * /auth/OAuth:
 *  post:
 *    summary: Registra/logea un usuario a traves de google.
 *    description: Espera por body que le pasen la prop code. Como google ya valida toda a informacion no se envia un email de validacion y en su lugar devuelve directamenente el token de autorizacion.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *    responses:
 *      200:
 *        description: Se verifico que el usuario esta registrado.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                authorization:
 *                  type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado por body es invalido o inexistente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  properties:
 *                    NombreDelDatoInvalido:
 *                      type: string
 *      401:
 *        description: Se genero un error debido a que el usuario este baneado.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Se genero un error dentro del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

/**
 * @swagger
 * /auth/send/resetPassword:
 *  get:
 *    summary: Envia un email de restablecimiento de contraseña.
 *    description: Espera por body que le pasen la prop "email" y enviara el email con el token de restablecimineto.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: Se verifico que el usuario esta registrado.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado por body es invalido o inexistente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  properties:
 *                    NombreDelDatoInvalido:
 *                      type: string
 *      404:
 *        description: Se genero un error debido a que el usuario no esta registrado.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Se genero un error dentro del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */

/**
 * @swagger
 * /auth/resetPassword:
 *  put:
 *    summary: Restablece la contraseña.
 *    description: asen por body el "token" (se encuntra en la url de la vista de reestablecimiento de contraseña) y "newPassword". En caso de que el token sea el correcto se reestablecera la contraseña y se enviara un obj con el status.
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *              newPassword:
 *                type: string
 *    responses:
 *      200:
 *        description: Se restablecio la contraseña del usuario.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado por body es invalido o inexistente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: object
 *                  properties:
 *                    NombreDelDatoInvalido:
 *                      type: string
 *      404:
 *        description: Se genero un error debido a que el token enviado no es valido.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Se genero un error dentro del servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */