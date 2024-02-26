import prismaClient from "../../db/prisma/client.prisma";
import { CreateTweetDto, UpdateTweetDto } from "./tweets.type";

class TweetsService {
  async getTweets() {
    const tweets = await prismaClient.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { comments: true },
    });

    return tweets;
  }

  async createTweet(createTweetDto: CreateTweetDto) {
    const { authorId, title, content } = createTweetDto;
    const tweet = await prismaClient.tweet.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });

    return tweet;
  }

  async updateTweet(updateTweetDto: UpdateTweetDto) {
    const { tweetId: id, title, content } = updateTweetDto;
    const tweet = await prismaClient.tweet.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return tweet;
  }

  async deleteTweet({ tweetId }: { tweetId: number }) {
    const tweet = await prismaClient.tweet.delete({
      where: { id: tweetId },
    });

    return tweet;
  }
}

const tweetsService = new TweetsService();

export default tweetsService;
