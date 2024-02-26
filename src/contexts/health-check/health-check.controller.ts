import { Router } from "express";

const healthCheckController = Router();

healthCheckController.use("/", (_, res) => {
  res.json("hello express~~");
});

export default healthCheckController;
