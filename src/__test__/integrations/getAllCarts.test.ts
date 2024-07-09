import { prisma } from "../../database/prisma";
import { request } from "../../utils/request";
import { carListMock } from "../__mock__/carMocks";

describe("Integration test: Get All Cars", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()])
    });

    test("Should be able to get all cars successfully", async () => {
        await prisma.car.createMany({ data: carListMock})

        const data = await request.get("/cars").expect(200).then((response) => response.body)
        
        expect(data).toHaveLength(2)

    })
})