import { Request, Response } from "express";
import { register, login, byGoogle, validator, passwordResetEmail, passwordReset } from "../controllers/controllerAuth";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await register(req.body);
        res.status(201).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await login(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "Email o contraseña incorrecta" ||
            error.message === "Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas") {
            res.status(401).json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
}

export const OAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await byGoogle(req.body);
        res.status(200).json(response);
    } catch (error: any) {
        if (error.message === "Lo sentimos, pero tu cuenta ha sido suspendida debido a una violación de nuestras políticas") {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message })
        }
    }
}

export const validateEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        await validator(req.params as {id: string});
        res.redirect("http://localhost:5173/");
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const sendPasswordResetEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await passwordResetEmail(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "Este email no esta registrado") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = await passwordReset(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        if (error.message === "El token proporcionado es invalido") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}