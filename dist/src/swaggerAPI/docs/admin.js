"use strict";
/**
 * @swagger
 * /management/signin:
 *  post:
 *    summary: Se encarga de validar al administrador
 *    description: Valida las credenciales del administrador y devuelve el token "authorization" con el que tendra acceso a las funciones de administrador
 *    tags: [Admin]
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
 *        description: Se genero un error debido a que las credenciales del administrador son incorrectas.
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
 * /management/user/all:
 *  get:
 *    summary: Devuelve la informacion basica de todos los usuarios
 *    description: Recibe por headers el token "authorization" del usuario, en caso de no enviarle nada por query responde con la informacion de todos los usuarios. Se pueden filtrar los usuarios por "name", "lastname", "email", "localRegistration", "validated" y "isBanned", tambien permite ordenamientos por la prop "sortBy" en la que puedes poner el valor por el que se ordenara "name", "lastname", etc, y con "sortOrder" eliges el orden es decir "ASC" o "DESC". Con las prop "limit" defines cuantos usuarios debe mostrar por pagina y con "page" defines cual paginas quieres recibir.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: name
 *        description: (Optional) Filtra los usuarios por su nombre.
 *        schema:
 *          type: string
 *      - in: query
 *        name: lastname
 *        description: (Optional) Filtra los usuarios por su apellido.
 *        schema:
 *          type: string
 *      - in: query
 *        name: email
 *        description: (Optional) Filtra los usuarios por su email.
 *        schema:
 *          type: string
 *      - in: query
 *        name: localRegistration
 *        description: (Optional) Filtra los usuarios por si se registraron localmente o por un tercero.
 *        schema:
 *          type: boolean
 *      - in: query
 *        name: validated
 *        description: (Optional) Filtra los usuarios por si estan validados o no.
 *        schema:
 *          type: boolean
 *      - in: query
 *        name: isBanned
 *        description: (Optional) Filtra los usuarios por si estan baneados o no.
 *        schema:
 *          type: boolean
 *      - in: query
 *        name: sortBy
 *        description: (Optional) Ordena los productos de acuerdo al valor enviado, por ejemplo "name", "lastname", etc.
 *        schema:
 *          type: string
 *      - in: query
 *        name: sortOrder
 *        description: (Solo si se envia "sortBy") Establece el tipo de orden. Los valores aceptados son "DESC" y "ASC".
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        description: (Obligatorio) Indica cual pagina de productos debe enviar.
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        description: (Obligatorio) Indica la cantidad de productos que habra por pagina.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Encontro y devolvio a todos los usuarios.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                rows:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      image:
 *                        type: string
 *                      name:
 *                        type: string
 *                      lastname:
 *                        type: string
 *                      email:
 *                        type: string
 *                      localRegistration:
 *                        type: boolean
 *                      validated:
 *                        type: boolean
 *                      isBanned:
 *                        type: boolean
 *                      createdAt:
 *                        type: string
 *                      updatedAt:
 *                        type: string
 *                      deletedAt:
 *                        type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 *        description: No hay usuarios existentes.
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
 * /management/user/ban/{id}:
 *  put:
 *    summary: Banea un usuario.
 *    description: Se encarga de banear y desbanear a un usuario, si esta baneado lo desbanea y viceversa. Requiere que le pasen el id del usuario por param.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Actualizo el estado del usuario
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
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 * /management/user/{id}:
 *  get:
 *    summary: Devuelve toda la informacion del usuario, incluyendo sus compras.
 *    description: Recibe por params el id del usuario y devuelve toda las informacion que exista del usuario.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Encontro la informacion del usuario.
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
 *                deletedAt:
 *                  type: string
 *                Orders:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      status:
 *                        type: string
 *                      total:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                      updatedAt:
 *                        type: string
 *                      Details:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          quantity:
 *                            type: integer
 *                          unitPrice:
 *                            type: string
 *                          totalPrice:
 *                            type. string
 *                          createdAt:
 *                            type: string
 *                          updatedAt:
 *                            type: string
 *                          Product:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: string
 *                              name:
 *                                type: string
 *                              image:
 *                                type: string
 *                              price:
 *                                type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 *        description: No hay usuarios existentes.
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
 * /management/order/all:
 *  get:
 *    summary: Devuelve informacion basica de todas las compras
 *    description: Devuelve la informacionde todas las compras realizadas en caso de no recibir nada por query. Tambien filtra las ordenes por su "status", con "sortBy" define el ordenamiento por ejmplo "total" o "createdAt". Con "sortOrder" define el tipo de orden "ASC" o "DESC". Para el paginado usa "limit" para definir cuantas ordenes habra por pagina y con "page" define la pagina a recibir.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: status
 *        description: (Optional) Filtra las ordenes de compra por su estado.
 *        schema:
 *          type: string
 *      - in: query
 *        name: sortBy
 *        description: (Optional) Ordena las ordenes de acuerdo al valor enviado, por ejemplo "total", "createdAt", etc.
 *        schema:
 *          type: string
 *      - in: query
 *        name: sortOrder
 *        description: (Solo si se envia "sortBy") Establece el tipo de orden. Los valores aceptados son "DESC" y "ASC".
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        description: (Obligatorio) Indica cual pagina de ordenes debe enviar.
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        description: (Obligatorio) Indica la cantidad de ordenes que habra por pagina.
 *        schema:
 *          type: string
 *    response:
 *      200:
 *        description: Devolvio la informacionde todas las compras.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                rows:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      status:
 *                        type: string
 *                      total:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                      updateAt:
 *                        type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 *        description: No hay ordenes de compra existentes.
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
 *
 */
/**
 * @swagger
 * /management/order/update/status:
 *  put:
 *    summary: Actualiza el estado de una orden de compra.
 *    description: Necesita que le pasen aparte del token "authorization" por headers, la propiedad "id"(de la orden) y "status"("Aprovado", "Cancelado", "Pendiente") por body.
 *    tags: [Admin]
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
 *              id:
 *                type: string
 *              status:
 *                type: string
 *    responses:
 *      200:
 *        description: Actualizo el estado de una orden.
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
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 * /management/order/{id}:
 *  get:
 *    summary: Devuelve toda la informacion vinculada a una orden de compra.
 *    description: Devuelve desde detalles especificos de la compra hasta la informacion del usuario que creo la orden. Espera recibir por header el token "authorization" y por params el id de la orden.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Encontro la informacion del usuario.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                status:
 *                  type: string
 *                total:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                updateAt:
 *                  type: string
 *                User:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type. string
 *                    name:
 *                      type: string
 *                    lastname:
 *                      type: string
 *                    image:
 *                      type: string
 *                Details:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      quantity:
 *                        type: integer
 *                      unitPrice:
 *                        type: string
 *                      totalPrice:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                      updateAt:
 *                        type: string
 *                      Product:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          name:
 *                            type: string
 *                          image:
 *                            type: string
 *                          price:
 *                            type: string
 *      400:
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 *        description: No se encontro informacion sobre la orden de compra.
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
 * /management/product/create:
 *  post:
 *    summary: Crea un Producto
 *    description: Crea un producto en la db. Necesita el token "authorization" por headers y por body las props "name", "description", "image", "price", "categoryName".
 *    tags: [Admin]
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
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *              price:
 *                type: number
 *              categoryName:
 *                type: string
 *    responses:
 *      200:
 *        description: Se creo un nuevo producto.
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
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 * /management/product/update:
 *  put:
 *    summary: Actualiza la informacion de un producto
 *    description: Recibe el token "authorization" por headers y por body las props "id" y "data". El formato es que dentro de data esten las props que desees cambiar del producto, por ejemplo "name", "image", etc.
 *    tags: [Admin]
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
 *              id:
 *                type: string
 *              data:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  image:
 *                    type: string
 *                  price:
 *                    type: string
 *                  categoryName:
 *                    type: string
 *    responses:
 *      200:
 *        description: Se actualizo el producto.
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
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 * /management/product/delete/{id}:
 *  delete:
 *    summary: Elimina un producto.
 *    description: Recibe el token "authorization" por headers y por params el id del producto a eliminar.
 *    tags: [Admin]
 *    parameters:
 *      - in: header
 *        name: authorization
 *        description: Token de autorización
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Se borro el producto.
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
 *        description: Se genero un error debido a que el tipo de algun dato enviado es invalido o inexistente.
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
 *        description: Ocurrio un error en el sistema.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */ 
