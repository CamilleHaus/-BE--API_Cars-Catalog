import "reflect-metadata";
import { UserServices } from "../../../services/users.services";
import { prismaMock } from "../../__mock__/prisma";
import {
    loginUserMock, returnUserMock,
    userMock,
    wrongPasswordMock
} from "../../__mock__/userMocks";

describe("Unit test: Login User", () => {
  test("Should be able to login successfully", async () => {
    const userServices = new UserServices();

    const completeUser = await userMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const data = await userServices.login(loginUserMock);

    expect(data.accessToken).toBeDefined();
    expect(data.user).toStrictEqual(returnUserMock.user);
  });

  test("Should throw an error if user does not exist", async () => {
    const userServices = new UserServices();

    const login = async () => await userServices.login(loginUserMock);

    expect(login()).rejects.toThrow("User not registered");

    // Nesse teste não é necessário mockar o prisma pois não vamos achar nenhum resultado final de usuário
  });

  test("Should throw an error if credentials do not match", async () => {
    const userServices = new UserServices();

    const completeUser = await userMock();

    prismaMock.user.findFirst.mockResolvedValue(completeUser);

    const loginAttempt = async () =>
      await userServices.login(wrongPasswordMock);

    await expect(loginAttempt()).rejects.toThrow(
      "E-mail and password doesn't match"
    );

    // Nesse teste, simulamos do mesmo jeito do login, porém fornecemos um MOCK com uma senha errada
  });
});
