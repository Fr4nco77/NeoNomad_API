import { Request, Response } from "express";
import { login, getUsers, getUserByID, bannUser, getOrders, getOrderByID, changeStatus, createProduct, updateProduct, removeProduct } from "../controllers/controllerAdmin";

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await login(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "Email o contraseña incorrecta") {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getAllUsers = async (req: any, res: Response): Promise<void> => {
    try {
        const users = await getUsers(req.query);
        res.status(200).json(users);
    } catch (error: any) {
        if (error.message === "No se encontraron usuarios") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserByID(req.params as {id: string});
        res.status(200).json(user);
    } catch (error: any) {
        if (error.message === "No se encontro al usuario") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const bannUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await bannUser(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllOrders = async (req: any, res: Response): Promise<void> => {
    try {
        const orders = await getOrders(req.query);
        res.status(200).json(orders);
    } catch (error: any) {
        if (error.message === "No se encontraron ordenes") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await getOrderByID(req.params as {id: string});
        res.status(200).json(order);
    } catch (error: any) {
        if (error.message === "No se encontro la orden de compra") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const updateStatusOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await changeStatus(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const postProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await createProduct(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const putProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await updateProduct(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await removeProduct(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}