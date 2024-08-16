export interface CommentModel {
  _id: string;
  content: string;
  postId: string;
  userId: string;
  likes: string[];
  numberOfLikes: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
