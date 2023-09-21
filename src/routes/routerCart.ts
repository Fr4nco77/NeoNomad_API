import { Router } from "express";
import { addProduct, removeProduct, getProducts } from "../handlers/handler Cart";
import { validateUserAuthorization } from "../middlewares/validateToken";
import { validateProductID } from "../middlewares/validateProductID";
import { validateQuantity } from "../middlewares/validateCart";

const routerCart = Router();

routerCart
        .get("/", validateUserAuthorization, getProducts)
        .post("/add", validateUserAuthorization, validateProductID, validateQuantity, addProduct)
        .delete("/remove", validateUserAuthorization, validateProductID, removeProduct)

export default routerCart;
