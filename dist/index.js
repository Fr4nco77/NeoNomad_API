"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const config_1 = __importDefault(require("./src/dataBase/config"));
config_1.default.sync({ force: true }).then(() => {
    app_1.default.listen(process.env.SERVER_PORT, () => {
        console.log(`Server on port ${process.env.SERVER_PORT}`);
    });
});
