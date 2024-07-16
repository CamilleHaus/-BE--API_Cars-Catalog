import { CarServices } from "../../../services/cars.services"
import { carCreateMock, carMock, userIdMock, userIdMockNonExisting} from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Delete car", () => {
    
    test("Should be able to delete a car successfully", async () => {
        const carServices = new CarServices();

        prismaMock.car.findUnique.mockResolvedValue(carMock);

        await carServices.deleteCars(carMock.id, userIdMock)

    })

    test("Should throw an error when Car is not found", async () => {
        const carServices = new CarServices();

        prismaMock.car.findFirst.mockResolvedValue(carMock)

        const deleteCar = async () => await carServices.deleteCars(carMock.id, userIdMock)

        expect(deleteCar()).rejects.toThrow("Car not found")

    })

    test("Should throw an error when user is not the owner of the car", async () => {
        const carServices = new CarServices();

        prismaMock.car.findUnique.mockResolvedValue(carMock);
       
        const deleteCar = async () => await carServices.deleteCars(carMock.id, userIdMockNonExisting)

        expect(deleteCar()).rejects.toThrow("You are not the owner of this car")
    })
});