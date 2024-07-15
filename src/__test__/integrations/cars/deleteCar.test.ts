import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { carCreateMock } from "../../__mock__/carMocks";

describe("Integration test: Delete Car", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()])
    });

    test("Should be able to delete a car successfully", async () => {
        const newCar = await prisma.car.create({ data: carCreateMock})

        await request.delete(`/cars/${newCar.id}`).expect(204)
        
    })

    test("Should throw an error when car ID invalid", async () => {
        const data = await request.delete("/cars/8c6908b6-91d7-4270-b5df-32f9ec0b33c8").expect(404).then((response) => response.body)

        expect(data.message).toBe("Car not found")
    })
})