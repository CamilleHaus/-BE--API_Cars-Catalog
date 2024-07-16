import { prisma } from "../../../database/prisma";
import { CarServices } from "../../../services/cars.services"
import { carCreateMock, carMock, updateCarMock, userIdMock } from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Update car", () => {
    
    test("Should be able to update a car successfully", async () => {
        const carServices = new CarServices();

        prismaMock.car.create.mockResolvedValue(carMock);
        const createdCar = await carServices.createCar(carCreateMock, userIdMock)
        
        const newCar = {...carMock, ...updateCarMock}
        console.log(createdCar, "##### TESTE")
        
        prismaMock.car.update.mockResolvedValue(newCar)
        
        const data = await carServices.updateCar(carMock.id, updateCarMock, userIdMock)

        expect(data).toBe(newCar)
    })

    test("Should throw an error when Car is not found", async () => {
        const carServices = new CarServices();

        prismaMock.car.findFirst.mockResolvedValue(carMock)

        const update = async () => await carServices.updateCar(carMock.id, updateCarMock, userIdMock)

        expect(update()).rejects.toThrow("Car not found")

    })
});