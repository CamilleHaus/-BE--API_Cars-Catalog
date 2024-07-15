import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/AppError";

export class VerifyUser {
    static async execute (req: Request, res: Response, next: NextFunction) {
         const userId = res.locals.decode.id;

         if(res.locals.user.user.id !== userId) {
            throw new AppError(403, "User must be the car owner")
        }

        next();
    }

}