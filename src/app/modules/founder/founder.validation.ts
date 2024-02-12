import { z } from 'zod';

const createFounderValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  founderPersonImg: z.string().optional(),
  designation: z.string({
    required_error: 'Designation is required',
  }),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  email: z.string().optional(),
  portfolio: z.string().optional(),
  authorId: z.string({
    required_error: 'Admin ID is required',
  }),
});

const updateFounderValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    founderPersonImg: z.string().optional(),
    designation: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    email: z.string().optional(),
    portfolio: z.string().optional(),
  }),
});

export const FounderValidation = {
  createFounderValidation,
  updateFounderValidation,
};
