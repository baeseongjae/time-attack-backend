import { Router } from "express";
import accountsController from "./accounts/index.accounts";
import follwersController from "./followers/followers.controller";
import followingsController from "./followings/followings.controller";
import healthCheckController from "./health-check/health-check.controller";
import tweetsController from "./tweets/tweets.controller";

const controllers = Router();

controllers.use("/health-check", healthCheckController);
controllers.use("/accounts", accountsController);
controllers.use("/tweets", tweetsController);
controllers.use("/followings", followingsController);
controllers.use("/followers", follwersController);

export default controllers;
