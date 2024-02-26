import { Router } from "express";
import userOnly from "../../../../guards/userOnly.guard";
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
profilesController.put("/", userOnly, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { nickname, description } = req.body;
    const profile = await profilesService.updateProfile({
      userId,
      nickname,
      description,
    });

    res.json(profile);
  } catch (e) {
    next(e);
  }
});

export default profilesController;
