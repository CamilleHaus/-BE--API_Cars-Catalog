import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../erros/AppError";

export class HandleErros {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json(error.message)
        }

        if (error instanceof ZodError) {
            return res.status(422).json(error)
        }

        console.log(error)

        return res.status(500).json({ message: "Internal server error" })
    }
}