import { request } from "../../../utils/request";
import { usersListMock } from "../../__mock__/userMocks";
import { prisma } from "../../../database/prisma";
import { UserFactory } from "../../factories/users.factory";
import bcrypt from "bcrypt";

describe("Integration test: Get All Users", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()])
    });

    test("Should be able to get all users successfully", async () => {
        const userData = Array.from({ length: 10 }, () => UserFactory.build());

        for (const user of userData) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        console.log(userData, "##### USER DATA ")

        await prisma.user.createMany({ data: userData })

        const data = await request.get("/users").then((response) => response.body)

        console.log(data, "DATA")

        expect(data).toHaveLength(userData.length)

        data.forEach((user: any, index: number) => {
            expect(user).toMatchObject({
                id: expect.any(String),
                name: userData[index].name,
                email: userData[index].email,
            });
            // Ensure password is not returned
            expect(user).not.toHaveProperty('password');
        });
    });
})
