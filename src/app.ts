import express, { json } from "express";
import "reflect-metadata";
import { carRouter } from "./routes/car.routes";
import { HandleErros } from "./middlewares/handleErrors.middleware";
import "express-async-errors";

export const app = express();

app.use(json())

app.use("/cars", carRouter)

app.use(HandleErros.execute)