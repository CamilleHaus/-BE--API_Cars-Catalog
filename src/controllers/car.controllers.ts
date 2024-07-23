import { injectable, inject } from "tsyringe";
import { CarServices } from "../services/cars.services";
import { Request, Response } from "express";

@injectable()
export class CarController {
  constructor(@inject("CarServices") private carServices: CarServices) {}

  async createCar(req: Request, res: Response): Promise<Response> {
    const userId = res.locals.decode.id;

    const response = await this.carServices.createCar(req.body, userId);

    return res.status(201).json(response);
  }

  async getManyCars(req: Request, res: Response): Promise<Response> {
    const response = await this.carServices.getManyCars();

    return res.status(200).json(response);
  }

  async getOneCar(req: Request, res: Response): Promise<Response> {
    const response = await this.carServices.getOneCar(req.params.id);

    return res.status(200).json(response);
  }

  async updateCar(req: Request, res: Response): Promise<Response> {
    const userId = res.locals.decode.id;

    const response = await this.carServices.updateCar(
      req.params.id,
      req.body,
      userId
    );

    return res.status(200).json(response);
  }

  async deleteCars(req: Request, res: Response): Promise<Response> {
    const userId = res.locals.decode.id;

    await this.carServices.deleteCars(req.params.id, userId);

    return res.status(204).json();
  }
}
