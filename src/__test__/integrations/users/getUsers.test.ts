import { response } from "express";
import { request } from "../../../utils/request";
import { loginUserFunctionMock, userMock, usersListMock, usersListMockWithoutPassword } from "../../__mock__/userMocks"
import { prisma } from "../../../database/prisma";

describe("Integration test: Get All Users", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()])
    });

    test("Should be able to get all users successfully", async () => {

        await prisma.user.createMany({data: usersListMock})

        const data = await request.get("/users").then((response) => response.body)
        
        expect(data).toHaveLength(2)
    })
})