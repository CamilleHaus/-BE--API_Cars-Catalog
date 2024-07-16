import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken"

export const userMock = {
    id: "15da97a-57de-45aa-8196-174a04b92a39",
    name: "Camille",
    email: "a@mail.com",
    password: "1234"
}

export const createUserMock = {
    name: "Camille",
    email: "a@mail.com",
    password: "1234"
}

export const loginUserMock = {
    email: "a@mail.com",
    password: "1234"
}

export const usersListMock = [
    {
    id: "15da97a-57de-45aa-8196-174a04b92a39",
    name: "Camille",
    email: "a@mail.com",
    password: "1234"
    },
    {
    id: "17da97a-57de-45aa-8196-174a04b92a39",
    name: "Camille",
    email: "234@mail.com",
    password: "1234"
    }
]

export const returnUserMock = {
    accessToken: "15da86a-57de-45aa-8196-174a04b92a39",
    user: {
        id: "15da97a-57de-45aa-8196-174a04b92a39",
        name: "Camille",
        email: "a@mail.com",
    }
}

export const loginUserFunctionMock = async () => {
    const user = await prisma.user.create({ data: createUserMock });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return { user, accessToken };
}