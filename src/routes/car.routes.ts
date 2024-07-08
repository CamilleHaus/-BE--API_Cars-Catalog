import { container } from "tsyringe"
import { CarServices } from "../services/cars.services"
import { CarController } from "../controllers/car.controllers"
import { Router } from "express"
import { ValidateBody } from "../middlewares/validateBody.middleware"
import { createCarSchema, updateCarSchema } from "../schemas/cars.schemas"
import { IsIdValid } from "../middlewares/isIdValid.middleware"

container.registerSingleton("CarServices", CarServices)
const carControllers = container.resolve(CarController)

export const carRouter = Router();

carRouter.use("/:id", IsIdValid.execute)

carRouter.post("/", ValidateBody.execute(createCarSchema), (req, res) => carControllers.createCar(req, res))
carRouter.get("/", (req, res) => carControllers.getManyCars(req, res))
carRouter.get("/:id", (req, res) => carControllers.getOneCar(req, res))
carRouter.patch("/:id", ValidateBody.execute(updateCarSchema), (req, res) => carControllers.updateCar(req, res))
carRouter.delete("/:id", (req, res) => carControllers.deleteCars(req, res))
