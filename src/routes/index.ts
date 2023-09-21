import { Router } from "express";
import swaggerSpec from "../swaggerAPI/swaggerSpec";
import swaggerUi from "swagger-ui-express";
import routerAuth from "./routerAuth";
import routerProduct from "./routerProduct";
import routerCart from "./routerCart";
import routerUser from "./routerUser";

const router = Router();

router
    .use("/auth", routerAuth)
    .use("/product", routerProduct)
    .use("/cart", routerCart)
    .use("/user", routerUser)
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
