"use strict";
/**
 * @swagger
 * /cart:
 *  get:
 *    summary: Devuelve el contenido del carrito.
 *    description: Espera que le pasen el token del usuario y devolverá el contenido del carrito. En caso de no haber nada, se mostrará un error.
 *    tags: [Cart]
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
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  quantity:
 *                    type: integer
 *                  Product:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      image:
 *                        type: string
 *                      price:
 *                        type: string
 *      404:
 *        description: No se encontraron productos en el carrito.
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
 * /cart/add:
 *  post:
 *    summary: Agrega Productos al carrito o actualiza la cantidad del mismo
 *    description: Se encargar de agregar productos al carrito y en caso de que el producto ya exista dentro de el se actualizara su cantidad. La ruta espera que le pasen por header el token "authorization" y por body "productID" y "quantity".
 *    tags: [Cart]
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
 *              productID:
 *                type: string
 *              quantity:
 *                type: integer
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
 *      404:
 *        description: No se encontro al usuario o producto.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      406:
 *        description: La cantidad enviada resultara en valores negativos dentro del carrito.
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
 * /cart/remove:
 *  delete:
 *    summary: Elimina un producto del carrito.
 *    description: La ruta eliminara el producto deseado del carrito, hay que pasarle el token "authorization" por header, y por body a "productID".
 *    tags: [Cart]
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
 *              productID:
 *                type: string
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
 *      404:
 *        description: No se encontro al producto.
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
