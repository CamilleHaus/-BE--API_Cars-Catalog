import { CarServices } from "../../services/cars.services"
import { carMock, updateCarMock } from "../__mock__/carMocks";
import { prismaMock } from "../__mock__/prisma";

describe("Unit test: Update car", () => {
    
    test("Should be able to update a car successfully", async () => {
        const carServices = new CarServices();

        const newCar = {...carMock, ...updateCarMock}

        prismaMock.car.update.mockResolvedValue(newCar);

        const data = await carServices.updateCar(carMock.id, updateCarMock)

        expect(data).toBe(newCar)
    })
});