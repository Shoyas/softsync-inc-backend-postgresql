import { z } from 'zod';
import { adminRoleEnum } from './admin.constant';

const createAdminValidation = z.object({
  userName: z.string({
    required_error: 'Name is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  securityCode: z.number({
    required_error: 'Security Code is required',
  }),
  adminImg: z.string().optional(),
  role: z.enum([...adminRoleEnum] as [string, ...string[]], {
    required_error: 'Role is required',
  }),
});

export const AdminValidation = {
  createAdminValidation,
};
