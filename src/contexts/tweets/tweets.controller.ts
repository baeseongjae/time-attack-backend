import { Router } from "express";
import userOnly from "../../guards/userOnly.guard";
import commentsController from "./comments/comments.controller";
import tweetsService from "./tweets.service";

const tweetsController = Router();

tweetsController.use("/comments", commentsController);

tweetsController.get("/", async (_, res, next) => {
  try {
    const tweets = await tweetsService.getTweets();

    res.json(tweets);
  } catch (e) {
    next(e);
  }
});

tweetsController.post("/", userOnly, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user!.id;
    const tweet = await tweetsService.createTweet({ authorId, title, content });

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

tweetsController.patch("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const tweetId = Number(req.params.tweetId);
    const tweet = await tweetsService.updateTweet({ tweetId, title, content });

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

tweetsController.delete("/:tweetId", userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const tweet = await tweetsService.deleteTweet({ tweetId });

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

export default tweetsController;
