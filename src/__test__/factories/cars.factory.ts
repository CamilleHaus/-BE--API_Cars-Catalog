import { fakerPT_BR as faker } from "@faker-js/faker";
import { TCreateCar } from "../../schemas/cars.schemas";

export class CarFactory {
  static build = (data: Partial<TCreateCar> = {}) => {
    return {
      id: faker.string.uuid(),
      name: faker.vehicle.model(),
      description: "Semi-novo",
      brand: faker.vehicle.manufacturer(),
      year: faker.number.int({ min: 2000, max: 2024 }),
      km: faker.number.int({ min: 10000, max: 100000 }),
      userId: faker.string.uuid(),
      ...data,
    };
  };
}
