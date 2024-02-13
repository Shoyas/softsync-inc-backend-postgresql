import { z } from 'zod';

const createCategoryValidation = z.object({
  categoryTitle: z.string({
    required_error: 'Title is required',
  }),
  categoryDescription: z.string({
    required_error: 'Description is required',
  }),
  categoryImg: z.string().optional(),
});

const updateCategoryValidation = z.object({
  body: z.object({
    categoryTitle: z.string().optional(),
    categoryDescription: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};
