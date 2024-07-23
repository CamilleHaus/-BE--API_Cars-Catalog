import "reflect-metadata";
import { injectable } from "tsyringe";
import {
  TCarSchema,
  TCreateCar,
  TUpdateCarBody,
} from "../schemas/cars.schemas";
import { prisma } from "../database/prisma";
import { AppError } from "../erros/AppError";

@injectable()
export class CarServices {
  async createCar(
    body: TCreateCar,
    userId: string
  ): Promise<TCarSchema | undefined> {
    const newCar = await prisma.car.create({
      data: {
        ...body,
        userId,
      },
    });

    return newCar;
  }

  async getManyCars(userId?: string): Promise<TCarSchema[]> {
    if (userId) {
      const userCars = await prisma.car.findMany({
        where: {
          userId: userId,
        },
      });

      return userCars;
    }

    const data = await prisma.car.findMany();

    return data;
  }

  async getOneCar(carId: string): Promise<TCarSchema | null> {
    const data = await prisma.car.findFirst({
      where: { id: carId },
    });

    return data;
  }

  async updateCar(
    carId: string,
    body: TUpdateCarBody,
    userId: string
  ): Promise<TCarSchema> {
    const existingCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!existingCar) {
      throw new AppError(404, "Car not found");
    }

    if (existingCar.userId !== userId) {
      throw new AppError(404, "You are not the owner of this car");
    }

    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: {
        ...body,
        userId: userId,
      },
    });

    return updatedCar;
  }

  async deleteCars(carId: string, userId: string): Promise<void> {
    const existingCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!existingCar) {
      throw new AppError(404, "Car not found");
    }

    if (existingCar.userId !== userId) {
      throw new AppError(404, "You are not the owner of this car");
    }

    await prisma.car.delete({
      where: { id: carId },
    });
  }
}
