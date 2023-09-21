import { Request, Response } from "express";
import { getData, getOrders, updateData } from "../controllers/controllerUser";

export const getUserData = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getData(req.body);
        res.status(200).json(user);
    } catch (error: any) {
        if (error.message === "El usuario no existe") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getOrdersData = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await getOrders(req.body);
        res.status(200).json(orders);
    } catch (error: any) {
        if (error.message === "No hay ordenes de compra") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await updateData(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "No se actualizo ninguna valor") {
            res.status(401).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
