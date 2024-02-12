import { z } from 'zod';

const createWorkValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  workImg: z.string().optional(),
  authorId: z.string({
    required_error: 'Admin ID is required',
  }),
});

const updateWorkValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const WorkValidation = {
  createWorkValidation,
  updateWorkValidation,
};
