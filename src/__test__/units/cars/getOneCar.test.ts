import { CarServices } from "../../../services/cars.services";
import { carMock } from "../../__mock__/carMocks";
import { prismaMock } from "../../__mock__/prisma";

describe("Unit test: Get one car", () => {
  test("Should be able to get a car successfully", async () => {
    const carServices = new CarServices();

    prismaMock.car.findFirst.mockResolvedValue(carMock);

    const data = await carServices.getOneCar(carMock.id);

    expect(data).toBe(carMock);
  });
});
