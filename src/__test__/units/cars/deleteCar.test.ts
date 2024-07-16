import { CarServices } from "../../../services/cars.services"
import { carCreateMock, carMock, userIdMock} from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Delete car", () => {
    
    test("Should be able to delete a car successfully", async () => {
        const carServices = new CarServices();

        prismaMock.car.create.mockResolvedValue(carMock);
        const createdCar = await carServices.createCar(carCreateMock, userIdMock)

        await carServices.deleteCars(createdCar!.id, userIdMock)

    })
});