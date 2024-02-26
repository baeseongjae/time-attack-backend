import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import followingsService from "./followings.service";

const followingsController = Router();

followingsController.post("/:userId", userOnly, (req, res, next) => {
  try {
    const targetUserId = req.params.userId;
    const userId = req.user!.id;
    const followings = followingsService.addFollowing(targetUserId, userId);

    res.json(followings);
  } catch (e) {
    next(e);
  }
});

followingsController.delete("/:userId", (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

export default followingsController;
