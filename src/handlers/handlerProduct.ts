import { Request, Response } from "express";
import { getAll, getByID, getCategorys } from "../controllers/controllerProduct";

export const getAllProducts = async (req: any, res: Response): Promise<void> => {
    try {
        const products = await getAll(req.query);
        res.status(200).json(products);
    } catch (error: any) {
        if (error.message === "No se encontraron productos") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getProductByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await getByID(req.params as {id: string});
      res.status(200).json(product);
    } catch (error: any) {
      if (error.message === "No se encontro el producto") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getCategorys();
        res.status(200).json(categories);
    } catch (error: any) {
        if (error.message === "No se encontraron categorias") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}