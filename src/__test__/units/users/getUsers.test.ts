import "reflect-metadata";
import { UserServices } from "../../../services/users.services"
import { prismaMock } from "../../__mock__/prisma";
import { usersListMock } from "../../__mock__/userMocks";

describe("Unit test: Get All Users", () => {

    test("Should be able to get all users successfully", async () => {
        const userServices = new UserServices();

        prismaMock.user.findMany.mockResolvedValue(usersListMock);

        const data = await userServices.getUsers()
        
        expect(data).toHaveLength(2)
    })
})