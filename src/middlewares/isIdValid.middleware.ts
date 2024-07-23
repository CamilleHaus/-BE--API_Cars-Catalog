import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../erros/AppError";

export class IsIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      throw new AppError(404, "Car not found");
    }

    next();
  }
}
