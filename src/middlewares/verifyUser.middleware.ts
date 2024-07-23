import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros/AppError";

export class VerifyUser {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals.decode.id;

    console.log(userId, "$$$$$ VERIFY USER");

    if (res.locals.decode.id !== userId) {
      throw new AppError(403, "User must be the car owner");
    }

    next();
  }
}
