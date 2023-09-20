import { Router } from "express";
import swaggerSpec from "../swaggerAPI/swaggerSpec";
import swaggerUi from "swagger-ui-express";
import routerAuth from "./routerAuth";
import routerProduct from "./routerProduct";

const router = Router();

router
    .use("/auth", routerAuth)
    .use("/product", routerProduct)
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
