"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../dataBase/models/Product");
const Category_1 = require("../../dataBase/models/Category");
const data_1 = __importDefault(require("./data"));
const seedProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const productData of data_1.default) {
        const { name, description, image, price, categoria } = productData;
        const [product, created] = yield Product_1.Product.findOrCreate({
            where: { name },
            defaults: {
                name,
                description,
                image,
                price
            }
        });
        if (!created)
            continue;
        const [category,] = yield Category_1.Category.findOrCreate({
            where: { name: categoria },
            defaults: { name: categoria }
        });
        yield product.$set("category", category);
    }
});
exports.default = seedProduct;
