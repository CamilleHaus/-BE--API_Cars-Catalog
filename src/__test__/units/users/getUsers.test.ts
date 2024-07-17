import "reflect-metadata";
import { UserServices } from "../../../services/users.services"
import { prismaMock } from "../../__mock__/prisma";
import { usersListMock, usersListMockWithoutPassword } from "../../__mock__/userMocks";

describe("Unit test: Get All Users", () => {

    test("Should be able to get all users successfully", async () => {
        const userServices = new UserServices();

        (prismaMock.user.findMany as jest.Mock).mockResolvedValueOnce(
            usersListMockWithoutPassword
          )

        const data = await userServices.getUsers()
        
        expect(data).toHaveLength(2)
    })
})