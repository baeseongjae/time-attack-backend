import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import commentsService from "./comments.service";

const commentsController = Router();

commentsController.post("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const { content } = req.body;
    const authorId = req.user!.id;

    const comment = await commentsService.createCommentOnTweet({
      tweetId,
      authorId,
      content,
    });
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

commentsController.patch(
  "/:tweetId/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const commentId = Number(req.params.commentId);
      const { content } = req.body;

      const comment = await commentsService.updateComment({
        commentId,
        content,
      });

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
);

commentsController.delete(
  "/:tweetId/:commentId",
  userOnly,
  async (req, res, next) => {
    try {
      const commentId = Number(req.params.commentId);
      const comment = await commentsService.deleteComment({ commentId });

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
);

export default commentsController;
