import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { carCreateMock, userIdMock } from "../../__mock__/carMocks";
import { createUserMock } from "../../__mock__/userMocks";

describe("Integration test: Get One Car", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.car.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  test("Should be able to get one car successfully", async () => {
    const user = await prisma.user.create({ data: createUserMock });

    const carWithUserId = {
      ...carCreateMock,
      userId: user.id,
    };

    const newCar = await prisma.car.create({ data: carWithUserId });

    const data = await request
      .get(`/cars/${newCar.id}`)
      .expect(200)
      .then((response) => response.body);

    expect(data.name).toBe(newCar.name);
    expect(data.description).toBe(newCar.description);
    expect(data.brand).toBe(newCar.brand);
    expect(data.year).toBe(newCar.year);
    expect(data.km).toBe(newCar.km);
  });

  test("Should throw an error when car ID invalid", async () => {
    const data = await request
      .delete("/cars/8c6908b6-91d7-4270-b5df-32f9ec0b33c8")
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Car not found");
  });
});
