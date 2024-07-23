import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/users.services";
import { UsersControllers } from "../controllers/users.controllers";
import { app } from "../app";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { createCarSchema } from "../schemas/cars.schemas";
import { createUserSchema, userLoginSchema } from "../schemas/user.schemas";
import { VerifyToken } from "../middlewares/validateToken.middleware";
import { VerifyUser } from "../middlewares/verifyUser.middleware";

container.registerSingleton("UserServices", UserServices)
const usersControllers = container.resolve(UsersControllers)

export const userRouter = Router();

userRouter.post("/", ValidateBody.execute(createUserSchema), (req, res) => usersControllers.createUser(req, res))
userRouter.post("/login", ValidateBody.execute(userLoginSchema), (req, res) => usersControllers.login(req, res))
userRouter.get("/", VerifyToken.execute, (req, res) => usersControllers.getUsers(req, res))