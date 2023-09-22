import { Router } from "express";
import swaggerSpec from "../swaggerAPI/swaggerSpec";
import swaggerUi from "swagger-ui-express";
import routerAuth from "./routerAuth";
import routerProduct from "./routerProduct";
import routerCart from "./routerCart";
import routerUser from "./routerUser";
import routerAdmin from "./routerAdmin";

const router = Router();

router
    .use("/auth", routerAuth)
    .use("/product", routerProduct)
    .use("/cart", routerCart)
    .use("/user", routerUser)
    .use("/management", routerAdmin)
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
