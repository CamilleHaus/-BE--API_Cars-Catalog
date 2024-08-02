import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import { carRouter } from "./routes/car.routes";
import { HandleErros } from "./middlewares/handleErrors";
import { userRouter } from "./routes/users.routes";
import { swaggerRouter } from "../swagger";

export const app = express();

app.use(json());

app.use("/cars", carRouter);
app.use("/users", userRouter);

app.use('/api/docs', swaggerRouter)

app.use(HandleErros.execute);
