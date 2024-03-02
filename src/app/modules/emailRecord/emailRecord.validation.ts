import { z } from 'zod';

const createEmailRecordValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    message: z.string({
      required_error: 'Message is required',
    }),
  }),
});

export const EmailRecordValidation = {
  createEmailRecordValidation,
};
