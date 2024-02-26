import { Router } from "express";
import profilesService from "./profiles.service";

const profilesController = Router();

// 타 유저의 정보조회
profilesController.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const profile = await profilesService.getProfile(userId);

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

// 프로필 정보 업데이트
profilesController.put("/", (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

export default profilesController;
