import { CarServices } from "../../services/cars.services"
import { carCreateMock, carMock } from "../__mock__/carMocks";
import { prismaMock } from "../__mock__/prisma";

describe("Unit test: Create car", () => {
    
    test("Should be able to create a car successfully", async () => {
        const carServices = new CarServices();

        prismaMock.car.create.mockResolvedValue(carMock);

        const data = await carServices.createCar(carCreateMock)

        expect(data).toBe(carMock)
    })
});