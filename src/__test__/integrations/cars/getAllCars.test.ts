import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { carListMock, userIdMock } from "../../__mock__/carMocks";
import { CarFactory } from "../../factories/cars.factory";
import { UserFactory } from "../../factories/users.factory";

describe("Integration test: Get All Cars", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()])
    });

    afterEach(async () => {
        await prisma.$transaction([prisma.user.deleteMany()])
    });

    test("Should be able to get all cars successfully", async () => {

        const userData = Array.from({ length: 10 }, () => UserFactory.build());

        const users = await prisma.user.createMany({
            data: userData.map(user => ({
                name: user.name,
                email: user.email,
                password: user.password // ou hasheado, se necessário
            }))
        });

        const createdUsers = await prisma.user.findMany();

        const listCarData = Array.from({ length: 10 }, (_, index) => ({
            ...CarFactory.build(),
            userId: createdUsers[index % createdUsers.length].id, // Associa um userId existente
        }));

        await prisma.car.createMany({ data: listCarData })

        const data = await request.get(`/cars/`).expect(200).then((response) => response.body)

        expect(data).toHaveLength(listCarData.length);

        data.forEach((car: any, index: number) => {
            expect(car).toMatchObject({
                id: listCarData[index].id,
                name: listCarData[index].name,
                description: listCarData[index].description,
                brand: listCarData[index].brand,
                year: listCarData[index].year,
                km: listCarData[index].km,
                userId: listCarData[index].userId
            });
        });

    })
})