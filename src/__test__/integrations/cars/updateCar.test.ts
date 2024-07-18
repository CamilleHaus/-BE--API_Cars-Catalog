import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { carCreateMock, incompleteCarMock, updateCarMock } from "../../__mock__/carMocks";
import { loginUserFunctionMock } from "../../__mock__/userMocks";

describe("Integration test: Update Car", () => {

    beforeEach(async () => {
        await prisma.$transaction([prisma.car.deleteMany()])
    });

    test("Should be able to update a car successfully", async () => {
        const { accessToken } = await loginUserFunctionMock()

        const newCar = await request.post("/cars").send(carCreateMock).set('Authorization', `Bearer ${accessToken}`).expect(201).then((response) => response.body)

        const data = await request.patch(`/cars/${newCar.id}`).set('Authorization', `Bearer ${accessToken}`).send(updateCarMock).expect(200).then((response) => response.body)
        
        expect(data.id).toBeDefined()
        expect(data.description).toBe(updateCarMock.description)
        expect(data.brand).toBe(newCar.brand)
        expect(data.year).toBe(newCar.year)
        expect(data.km).toBe(newCar.km)
    })

    test("Should throw an error when car ID invalid", async () => {
        const { accessToken } = await loginUserFunctionMock()

        const data = await request.delete("/cars/8c6908b6-91d7-4270-b5df-32f9ec0b33c8").set('Authorization', `Bearer ${accessToken}`).expect(404).then((response) => response.body)

        expect(data.message).toBe("Car not found")
    })

    test("Should throw an error when body is not valid", async () => {
        const { accessToken } = await loginUserFunctionMock()
        
        await request.post("/cars").set('Authorization', `Bearer ${accessToken}`).send(incompleteCarMock).expect(400)

    })
})