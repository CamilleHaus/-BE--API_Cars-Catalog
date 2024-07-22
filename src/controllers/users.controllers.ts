import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/users.services";
import { Request, Response } from "express";

@injectable()
export class UsersControllers {

    constructor(@inject("UserServices") private userServices: UserServices) { }

    async createUser(req: Request, res: Response): Promise<Response> {

        const response = await this.userServices.createUser(req.body)

        return res.status(201).json(response)
    }

    async login(req: Request, res: Response): Promise<Response> {

        const response = await this.userServices.login(req.body);

        return res.status(200).json(response)
    }

    async getUsers(req: Request, res: Response): Promise<Response> {

        const response = await this.userServices.getUsers()

        return res.status(200).json(response)
    }
}