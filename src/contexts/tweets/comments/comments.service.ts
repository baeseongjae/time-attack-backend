import prismaClient from "../../../db/prisma/client.prisma";
import { commentDto } from "./comments.type";

class CommentsService {
  async createCommentOnTweet(commentDto: commentDto) {
    const { tweetId, authorId, content } = commentDto;

    const comment = await prismaClient.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        tweet: { connect: { id: tweetId } },
      },
    });

    return comment;
  }
}

const commentsService = new CommentsService();

export default commentsService;
