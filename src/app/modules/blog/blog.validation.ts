import { z } from 'zod';

const createBlogValidation = z.object({
  blogTitle: z.string({
    required_error: 'Title is required',
  }),
  blogContent: z.string({
    required_error: 'Content is required',
  }),
  blogImg: z.string().optional(),
  authorId: z.string({
    required_error: 'Admin ID is required',
  }),
});

export const BlogValidation = {
  createBlogValidation,
};
