import { Router } from "express";
import accountsController from "./accounts/index.accounts";
import healthCheckController from "./health-check/health-check.controller";

const controllers = Router();

controllers.use("/health-check", healthCheckController);
controllers.use("/accounts", accountsController);

export default controllers;
