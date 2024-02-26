import { Router } from "express";

const follwersController = Router();

follwersController.delete("/:userId", (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

export default follwersController;
