import "reflect-metadata";
import { injectable } from "tsyringe";
import { TCarSchema, TCreateCar, TUpdateCarBody } from "../schemas/cars.schemas";
import { prisma } from "../database/prisma";


@injectable()
export class CarServices {

    async createCar(body: TCreateCar): Promise<TCarSchema> {

        const newCar = await prisma.car.create({ data: body })

        return newCar
    }

    async getManyCars(): Promise<TCarSchema[]> {

        const data = await prisma.car.findMany()

        return data
    }

    async getOneCar(carId: string): Promise<TCarSchema | null> {

        const data = await prisma.car.findFirst({
            where: { id: carId }
        })

        return data
    }

    async updateCar(carId: string, body: TUpdateCarBody): Promise<TCarSchema> {

        const data = await prisma.car.update({
            where: { id: carId },
            data: body
        })

        return data
    }

    async deleteCars(carId: string): Promise<void> {

        await prisma.car.delete({
            where: { id: carId }
        })
    }
}