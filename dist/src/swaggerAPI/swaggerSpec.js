"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const spec = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Neo Nomad API",
            summary: "API for Cabron",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3001/",
            },
        ],
    },
    apis: ["./src/swaggerAPI/docs/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(spec);
exports.default = swaggerSpec;
