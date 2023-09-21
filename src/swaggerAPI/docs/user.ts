/**
 * @swagger
 * /user:
 *  get:
 *    summary: Devuelve la informacion del usuario
 *    description: Recibe por headers el token "authorization" del usuario y response con la informacion del mismo.
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: string
 *                image:
 *                  type: string
 *                name:
 *                  type: string
 *                lastname:
 *                  type: string
 *                role:
 *                  type: string
 *                phone:
 *                  type: string
 *                address:
 *                  type: object
 *                email:
 *                  type: string
 *                localRegistration:
 *                  type: boolean
 *                validated:
 *                  type: boolean
 *                isBanned:
 *                  type: boolean
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *      404:
 *        description: No se encontro al usuario.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Ocurrio un error en el sistema.
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
 * /user/orders:
 *  get:
 *    summary: Devuelve todas la informacionde las compras de un usuario.
 *    description: Recibe el token "authorization" por headers y devuelve las compras del usuario.
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *              
 *      404:
 *        description: No se encontro al usuario.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Ocurrio un error en el sistema.
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
 * /user/update:
 *  put:
 *    summary: Actualiza la informacion basica de un usuario.
 *    description: Recibe por headers el token "authorization", y por body "data" el cual debe ser un objeto con la informacion nueva del usuario. No es necesario pasar toda la informacion de usuario solo la que quieras cambiar. Los campos permitidos son "name", "lastname", "image", "phone" y "address"
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  image:
 *                    type: string
 *                  lastname:
 *                    type: string
 *                  name:
 *                    type: string
 *                  phone:
 *                    type: string
 *                  address:
 *                    type: object
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *      401:
 *        description: No se actualizo la informacion del usuario.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Ocurrio un error en el sistema.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
