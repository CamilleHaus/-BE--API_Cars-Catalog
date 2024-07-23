import "reflect-metadata";
import { UserServices } from "../../../services/users.services";
import { prismaMock } from "../../__mock__/prisma";
import {
  createUserMock,
  returnUserBodyMock,
  userMock,
} from "../../__mock__/userMocks";

describe("Unit test: Create a User", () => {
  test("Should be able to create a user successfully", async () => {
    const userServices = new UserServices();

    const completeUser = await userMock();

    prismaMock.user.create.mockResolvedValue(completeUser);

    const data = await userServices.createUser(createUserMock);

    expect(data).toEqual(returnUserBodyMock);
  });

  test("Should throw an error when email is already registered", async () => {
    const userServices = new UserServices();

    const completeUser = await userMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const register = async () => await userServices.createUser(createUserMock);

    expect(register()).rejects.toThrow("E-mail already registered");
  });
});
