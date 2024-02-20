import { z } from 'zod';

const createServiceValidation = z.object({
  serviceTitle: z.string({
    required_error: 'Title is required',
  }),
  authorId: z.string({
    required_error: 'Admin ID is required',
  }),
  categoryId: z.string({
    required_error: 'Category ID is required',
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    serviceTitle: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceValidation,
  updateServiceValidation,
};
