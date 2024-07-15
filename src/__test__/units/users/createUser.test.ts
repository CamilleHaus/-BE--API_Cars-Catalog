import "reflect-metadata";
import { UserServices } from "../../../services/users.services";
import { prismaMock } from "../../__mock__/prisma";
import { createUserMock, userMock } from "../../__mock__/userMocks";
import bcrypt from "bcrypt";

describe("Unit test: Create a User", () => {

    test("Should be able to create a user successfully", async () => {
        const userServices = new UserServices();

        const hashedPassword = await bcrypt.hash(createUserMock.password, 10);

        const returnedUserMock = {
            ...userMock,
            password: hashedPassword
        };

        prismaMock.user.create.mockResolvedValue(returnedUserMock);

        const data = await userServices.createUser(createUserMock);

        const { password: _, ...expectedUserWithoutPassword } = returnedUserMock;

        expect(data).toEqual(expectedUserWithoutPassword);
    })
});

// Nesse teste, como lidamos com senhas, simulamos da mesma forma o hasheamento da senha pelo bcrypt e colocamos no usuário passado para o Mock.
// Depois, criamos o usuário no prisma e retiramos a senha do usuário criado pelo Mock.
// Por fim, comparamos o data com o usuário criado sem a senha