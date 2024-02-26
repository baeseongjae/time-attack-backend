export type CreateTweetDto = {
  authorId: string;
  title: string;
  content: string;
};

export type UpdateTweetDto = {
  tweetId: number;
  title: string;
  content: string;
};
