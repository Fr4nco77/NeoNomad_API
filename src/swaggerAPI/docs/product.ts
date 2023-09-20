/**
 * @swagger
 * /product:
 *  get:
 *    summary: Devuelve todos los productos.
 *    description: Este endpoint tiene la funcion de devolver un obj, todos los productos existentes estaran en la prop "row" y la prop "count" indica cuantas paginas hay disponibles, los productos seran eniados en tandas para realizar un paginado del lado del servidor. Aparte se le puede pasar por query parametros que permitan el filtrado y ordenamiento de los productos.
 *    tags: [Product]
 *    parameters:
 *      - in: query
 *        name: name
 *        description: (Optional) Filtra los productos por su nombre.
 *        schema:
 *          type: string
 *      - in: query
 *        name: category
 *        description: (Optional) Filtra los productos por su categoria.
 *        schema:
 *          type: number
 *      - in: query
 *        name: sortBy
 *        description: (Optional) Ordena los cafes de acuerdo al valor enviado, por ejemplo "price".
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
 *        description: Se recibieron los productos de la DB
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: number
 *                rows:
 *                  type: array
 *                  items:
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
 *        description: No se encontraron productos.
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
 * /product/{id}:
 *  get:
 *    summary: Devuelve la informacion de un producto.
 *    description: Recibe el id de un producto por params y devuelve toda la informacion disponible del producto.
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del producto.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Se recibio la informacion del producto.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                price:
 *                  type: string
 *                categoryID:
 *                  type: number
 *                category:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    description:
 *                      type: string
 *                
 *      404:
 *        description: No se encontro el producto.
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
 * /product/categories:
 *  get:
 *    summary: Devuelve todas las categorias.
 *    description: Devuelve el id, name y description de todas las categorias.
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Se recibio la informacion de las categorias.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *      404:
 *        description: No se encontraron categorias.
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