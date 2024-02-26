import { Router } from "express";
import userOnly from "../../../guards/userOnly.guard";
import bookmarksService from "./bookmarks.service";

const bookmarksController = Router();

bookmarksController.get("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user!.id;
    const markedTweet = await bookmarksService.addBookmark(tweetId, userId);

    res.json(markedTweet);
  } catch (e) {
    next(e);
  }
});

bookmarksController.delete("/:tweetId", async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const userId = req.user!.id;
    const markedTweet = await bookmarksService.deleteBookmark(tweetId, userId);

    res.json(markedTweet);
  } catch (e) {
    next(e);
  }
});

bookmarksController.get("/", userOnly, async (_, res, next) => {
  try {
    const markedTweets = await bookmarksService.GetBookmarks();

    res.json(markedTweets);
  } catch (e) {
    next(e);
  }
});

export default bookmarksController;
