import express from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-admin',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN)
);

export const AdminRoute = router;
