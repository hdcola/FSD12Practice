import { blogAlova } from "../api";

export interface Blog {
  title: string;
  content: string;
  userId: number;
}

export const createBlog = async (blog: Blog) => {
  return blogAlova.Post("/blogs", blog);
};

