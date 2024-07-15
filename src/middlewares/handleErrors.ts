import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../erros/AppError";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErros {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message })
        }

        if(error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: error.message})
         }

        if (error instanceof ZodError) {
            const messageError = { errors: error.issues }
            return res.status(400).json(messageError)
        }

        console.log(error)

        return res.status(500).json({ message: "Internal server error" })
    }
}