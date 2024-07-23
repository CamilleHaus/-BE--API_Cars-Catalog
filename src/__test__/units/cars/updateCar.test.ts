import { CarServices } from "../../../services/cars.services";
import {
    carMock,
    updateCarMock,
    userIdMock,
    userIdMockNonExisting
} from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Update car", () => {
  test("Should be able to update a car successfully", async () => {
    const carServices = new CarServices();

    prismaMock.car.findUnique.mockResolvedValue(carMock);

    const newCar = { ...carMock, ...updateCarMock };

    prismaMock.car.update.mockResolvedValue(newCar);

    const data = await carServices.updateCar(
      carMock.id,
      updateCarMock,
      userIdMock
    );

    expect(data).toBe(newCar);
  });

  test("Should throw an error when Car is not found", async () => {
    const carServices = new CarServices();

    prismaMock.car.findFirst.mockResolvedValue(null);

    const update = async () =>
      await carServices.updateCar(carMock.id, updateCarMock, userIdMock);

    expect(update()).rejects.toThrow("Car not found");
  });

  test("Should throw an error when user is not the owner of the car", async () => {
    const carServices = new CarServices();

    prismaMock.car.findUnique.mockResolvedValue(carMock);

    const update = async () =>
      await carServices.updateCar(
        carMock.id,
        updateCarMock,
        userIdMockNonExisting
      );

    expect(update()).rejects.toThrow("You are not the owner of this car");
  });
});
