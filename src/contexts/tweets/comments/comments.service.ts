import prismaClient from "../../../db/prisma/client.prisma";
import { CreateCommentDto, UpdateCommentDto } from "./comments.type";

class CommentsService {
  async createCommentOnTweet(createCommentDto: CreateCommentDto) {
    const { tweetId, authorId, content } = createCommentDto;

    const comment = await prismaClient.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        tweet: { connect: { id: tweetId } },
      },
    });

    return comment;
  }

  async updateComment(updateCommentDto: UpdateCommentDto) {
    const { commentId, content } = updateCommentDto;

    const comment = await prismaClient.comment.update({
      where: { id: commentId },
      data: {
        content,
      },
    });

    return comment;
  }

  async deleteComment({ commentId }: { commentId: number }) {
    const comment = await prismaClient.comment.delete({
      where: { id: commentId },
    });

    return comment;
  }
}

const commentsService = new CommentsService();

export default commentsService;
