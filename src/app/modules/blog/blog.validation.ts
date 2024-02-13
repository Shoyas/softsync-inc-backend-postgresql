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

const updateBlogValidation = z.object({
  body: z.object({
    blogTitle: z.string().optional(),
    blogContent: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidation,
  updateBlogValidation,
};
