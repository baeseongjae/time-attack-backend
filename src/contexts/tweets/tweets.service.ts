import prismaClient from "../../db/prisma/client.prisma";
import { CreateTweetData } from "./tweets.type";

class TweetsService {
  async getTweets() {
    const tweets = await prismaClient.tweet.findMany();

    return tweets;
  }

  async createTweet(createTweetData: CreateTweetData) {
    const { authorId, title, content } = createTweetData;
    const tweet = await prismaClient.tweet.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });

    return tweet;
  }
}

const tweetsService = new TweetsService();

export default tweetsService;
