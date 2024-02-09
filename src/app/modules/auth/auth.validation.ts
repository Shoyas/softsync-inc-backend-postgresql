import { z } from 'zod';

const loginAdminValidation = z.object({
  body: z.object({
    userName: z.string({
      required_error: 'Name is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  loginAdminValidation,
};
