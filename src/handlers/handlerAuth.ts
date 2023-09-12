import { Request, Response } from "express";
import { register, login, thirdParty } from "../controllers/controllerAuth";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await register(req.body);
        res.cookie("authorization", `Bearer ${token}`, {
            secure: false,
            sameSite: "none"
        })
        res.send("Cookie enviada");
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await login(req.body);
        res.cookie("authorization", `Bearer ${token}`, {
            secure: false,
            sameSite: "none",
        })
        res.send("Cookie enviada");
    } catch (error: any) {
        res.status(500).json({ error: error.message })

    }
}

export const thirdPartyAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await thirdParty(req.body);
        res.cookie("authorization", `Bearer ${token}`, {
            secure: false,
            sameSite: "none",
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}