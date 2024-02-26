export type CreateCommentDto = {
  tweetId: number;
  authorId: string;
  content: string;
};

export type UpdateCommentDto = {
  commentId: number;
  content: string;
};
