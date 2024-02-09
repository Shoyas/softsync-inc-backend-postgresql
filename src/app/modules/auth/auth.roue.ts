import express from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.get(
  '/profile',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  AuthController.getSingleAdminByToken
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginAdminValidation),
  AuthController.loginAdmin
);
router.post(
  '/change-password',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.changePasswordValidation),
  AuthController.changePassword
);

export const AuthRoute = router;
