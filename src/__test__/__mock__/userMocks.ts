import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const userMock = async () => {

    const hashedPassword = await bcrypt.hash("1234", 10)

    return {
        id: "15da97a-57de-45aa-8196-174a04b92a39",
        name: "Camille",
        email: "a@mail.com",
        password: hashedPassword
    }
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

export const returnUserBodyMock = {
    id: "15da97a-57de-45aa-8196-174a04b92a39",
    name: "Camille",
    email: "a@mail.com"
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