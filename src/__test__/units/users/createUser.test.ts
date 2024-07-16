import "reflect-metadata";
import { UserServices } from "../../../services/users.services";
import { prismaMock } from "../../__mock__/prisma";
import { createUserMock, returnUserBodyMock, userMock } from "../../__mock__/userMocks";
import bcrypt from "bcrypt";

describe("Unit test: Create a User", () => {

    test("Should be able to create a user successfully", async () => {
        const userServices = new UserServices();

        const completeUser = await userMock()

        prismaMock.user.create.mockResolvedValue(completeUser);

        const data = await userServices.createUser(createUserMock);

        expect(data).toEqual(returnUserBodyMock);
    })

    test("Should throw an error when email is already registered", async () => {
        const userServices = new UserServices();

        const completeUser = await userMock()

        prismaMock.user.findFirst.mockResolvedValue(completeUser);

        const register = async () => await userServices.createUser(createUserMock);

        expect(register()).rejects.toThrow("E-mail already registered")
    })
});

// Nesse teste, como lidamos com senhas, simulamos da mesma forma o hasheamento da senha pelo bcrypt e colocamos no usuário passado para o Mock.
// Depois, criamos o usuário no prisma e retiramos a senha do usuário criado pelo Mock.
// Por fim, comparamos o data com o usuário criado sem a senha