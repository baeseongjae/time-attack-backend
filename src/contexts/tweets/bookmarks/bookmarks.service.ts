import prismaClient from "../../../db/prisma/client.prisma";

class BookmarksService {
  async addBookmark(tweetId: number, userId: string) {
    const isMarked = await prismaClient.bookmark.findUnique({
      where: {
        userId_tweetId: { tweetId, userId },
      },
    });

    if (isMarked) throw new Error("This tweet has already been marked");

    const markedTweet = await prismaClient.bookmark.create({
      data: { userId, tweetId },
      select: { tweet: true },
    });

    return markedTweet;
  }

  async deleteBookmark(tweetId: number, userId: string) {
    const isMarked = await prismaClient.bookmark.findUnique({
      where: {
        userId_tweetId: { tweetId, userId },
      },
    });

    if (!isMarked)
      throw new Error("This tweet has already been removed from bookmark");

    const markedTweet = await prismaClient.bookmark.delete({
      where: { userId_tweetId: { tweetId, userId } },
      select: { tweet: true },
    });

    return markedTweet;
  }

  async GetBookmarks() {
    const markedTweets = await prismaClient.bookmark.findMany();

    return markedTweets;
  }
}

const bookmarksService = new BookmarksService();

export default bookmarksService;
