"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swaggerSpec_1 = __importDefault(require("../swaggerAPI/swaggerSpec"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routerAuth_1 = __importDefault(require("./routerAuth"));
const routerProduct_1 = __importDefault(require("./routerProduct"));
const router = (0, express_1.Router)();
router
    .use("/auth", routerAuth_1.default)
    .use("/product", routerProduct_1.default)
    .use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec_1.default));
exports.default = router;
