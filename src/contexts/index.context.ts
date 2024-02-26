import { Router } from "express";
import healthCheckController from "./health-check/health-check.controller";

const controllers = Router();

controllers.use("/health-check", healthCheckController);

export default controllers;
