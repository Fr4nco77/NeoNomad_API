import { Router } from "express";
import { loginAdmin, getAllUsers, getUser, bannUsers, getAllOrders, getOrder, updateStatusOrder, postProduct, putProduct, deleteProduct } from "../handlers/handlerAdmin";
import { validateAdminAuthorization } from "../middlewares/validateToken";
import { validateSignIn, validateBann, validateParamID, validateStatusOrder, validatePostProduct, validateUpdateProduct, validateRemoveProduct } from "../middlewares/validateAdmin";

const routerAdmin = Router();

routerAdmin
    .post("/signin", validateSignIn, loginAdmin)
    .get("/user/all", validateAdminAuthorization, getAllUsers)
    .put("/user/bann/:id", validateAdminAuthorization, validateBann, bannUsers)
    .get("/user/:id", validateAdminAuthorization, validateParamID, getUser)
    .get("/order/all", validateAdminAuthorization, getAllOrders)
    .put("/order/update/status", validateAdminAuthorization, validateStatusOrder, updateStatusOrder)
    .get("/order/:id", validateAdminAuthorization, validateParamID, getOrder)
    .post("/product/create", validateAdminAuthorization, validatePostProduct, postProduct)
    .put("/product/update", validateAdminAuthorization, validateUpdateProduct, putProduct)
    .delete("/product/delete/:id", validateAdminAuthorization, validateRemoveProduct, deleteProduct)

export default routerAdmin;
