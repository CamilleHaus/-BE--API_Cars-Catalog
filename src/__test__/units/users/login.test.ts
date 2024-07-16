import "reflect-metadata";
import { UserServices } from "../../../services/users.services";
import { prismaMock } from "../../__mock__/prisma";
import { createUserMock, loginUserFunctionMock, loginUserMock, returnUserBodyMock, returnUserMock, userMock } from "../../__mock__/userMocks";
import bcrypt from "bcrypt";

describe("Unit test: Login User", () => {

    test("Should be able to login successfully", async () => {
        const userServices = new UserServices();

        const completeUser = await userMock()

        prismaMock.user.findFirst.mockResolvedValue(completeUser);

        const data = await userServices.login(loginUserMock)

        console.log(data.user, "DATA #########")
        console.log(returnUserMock.user, "RETURN USER MOCK #########")

        expect(data.accessToken).toBeDefined();
        expect(data.user).toBe(returnUserMock.user)
    })
})