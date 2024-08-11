export type PostModel = {
  _doc: PostModel;
  __v: number;
  _id: string;
  userId: string;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
