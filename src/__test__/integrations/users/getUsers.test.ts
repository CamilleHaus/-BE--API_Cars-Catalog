import { response } from "express";
import { request } from "../../../utils/request";
import { loginUserFunctionMock, userMock } from "../../__mock__/userMocks"
import { prisma } from "../../../database/prisma";

describe("Integration test: Get All Users", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()])
    });

    test("Should be able to get all users successfully", async () => {
        const { user, accessToken } = await loginUserFunctionMock();

        const data = await request.get("/users").set("Authorization", `Bearer ${accessToken}`).then((response) => response.body)
        
        expect(data).toBe(user)
    })
})