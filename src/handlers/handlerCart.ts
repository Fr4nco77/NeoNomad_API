import { add, remove, get } from "../controllers/controllerCart";
import { Request, Response } from "express";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await add(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "Usuario o producto no encontrado") {
            res.status(404).json({ error: error.message });
        } else if (error.message === "La cantidad no puede ser negativa") {
            res.status(406).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await remove(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "El producto no se encontró en el carrito") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await get(req.body);
        res.status(200).json(cart);
    } catch (error: any) {
        if (error.message === "El carrito esta vacio") {
            res.status(404).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
}
