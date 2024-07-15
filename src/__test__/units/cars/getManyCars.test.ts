import { CarServices } from "../../../services/cars.services"
import { carListMock } from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Get all car", () => {
    
    test("Should be able to get all cars successfully", async () => {
        const carServices = new CarServices();

        prismaMock.car.findMany.mockResolvedValue(carListMock);

        const data = await carServices.getManyCars()

        expect(data).toHaveLength(2)
    })
});