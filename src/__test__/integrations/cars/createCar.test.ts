import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { carCreateMock, incompleteCarMock, tockenMock, userIdMock } from "../../__mock__/carMocks";
import { loginUserFunctionMock } from "../../__mock__/userMocks";


describe("Integration test: Create car", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()])
    });

    test("Should be able to create a car successfully", async () => {

        const { accessToken } = await loginUserFunctionMock()

        const data = await request.post("/cars").send(carCreateMock).set('Authorization', `Bearer ${accessToken}`).expect(201).then((response) => response.body)

        expect(accessToken).toBeDefined()
        expect(data.id).toBeDefined()
        expect(data.name).toBe(carCreateMock.name)
        expect(data.description).toBe(carCreateMock.description)
        expect(data.brand).toBe(carCreateMock.brand)
        expect(data.year).toBe(carCreateMock.year)
        expect(data.km).toBe(carCreateMock.km)
        expect(data.userId).toBeDefined()

    })

    test("Should throw an error when body is not valid", async () => {
        await request.post("/cars").send(incompleteCarMock).expect(400)

    })
})