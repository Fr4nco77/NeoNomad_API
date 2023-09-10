import { Request, Response } from "express";
import { register } from "../controllers/controllerAuth";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await register(req.body);
        res.status(201).json({authorization: `Bearer ${token}`});
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}