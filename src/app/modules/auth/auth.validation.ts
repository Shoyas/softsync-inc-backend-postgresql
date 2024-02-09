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
const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

export const AuthValidation = {
  loginAdminValidation,
  changePasswordValidation,
};
