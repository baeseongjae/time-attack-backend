import { Router } from "express";
import usersService from "./users.service";

const usersController = Router();

usersController.post("/sign-up", async (req, res, next) => {
  try {
    const accessToken = await usersService.signUp(req.body);

    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

usersController.post("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await usersService.logIn({ email, password });

    res.json(accessToken);
  } catch (e) {
    next(e);
  }
});

export default usersController;
