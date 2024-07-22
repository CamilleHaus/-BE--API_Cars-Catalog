import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCreateUser, TReturn, TUserLogin, TUserLoginReturn, returnSchema } from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../erros/AppError";

@injectable()
export class UserServices {

    async createUser(body: TCreateUser): Promise<TReturn> {

        const hashedPassowrd = await bcrypt.hash(body.password, 10)
 
        const newUser = {
            ...body,
            password: hashedPassowrd
        }

        const checkUser = await prisma.user.findFirst({
            where: { email: body.email }
        })

        if (checkUser) {
            throw new AppError(409, "E-mail already registered")
        }

        const user = await prisma.user.create({
            data: newUser
        })

        const { password, ...userWithoutPassword } = user;


        return userWithoutPassword
    }

    async login(body: TUserLogin): Promise<TUserLoginReturn> {

        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (!user) {
            throw new AppError(404, "User not registered")
        }

        const isPasswordValid = await bcrypt.compare(body.password, user!.password)

        if (!isPasswordValid) {
            throw new AppError(401, "E-mail and password doesn't match")
        }

        const secret = process.env.JWT_SECRET as string

        const accessToken = jwt.sign({ id: user.id }, secret, {
            expiresIn: "1h"
        })

        const userWithoutPassword = returnSchema.parse(user)

        return { accessToken, user: userWithoutPassword }
    }

    async getUsers(): Promise<TReturn[]> {

        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return allUsers

    }
}