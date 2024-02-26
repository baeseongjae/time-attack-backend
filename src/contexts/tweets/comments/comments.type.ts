export type CommentDto = {
  tweetId: number;
  authorId: string;
  content: string;
};

export type UpdateCommentDto = {
  commentId: number;
  content: string;
};
