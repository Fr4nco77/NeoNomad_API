import { Router } from "express";
import routerAuth from "./routerAuth";

const router = Router();

router
    .use("/auth", routerAuth)

export default router;