import { Router } from "express";
import { getAllProducts,getProductByID, getAllCategories } from "../handlers/handlerProduct";

const routerProduct = Router();

routerProduct
            .get("/", getAllProducts)
            .get("/categories", getAllCategories)
            .get("/:id", getProductByID)

export default routerProduct;
