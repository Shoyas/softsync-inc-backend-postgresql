import express from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import auth from '../../middlewares/auth';
import { VisitorController } from './visitor.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  VisitorController.getAllVisitor
);

router.post('/create-visitor', VisitorController.createVisitor);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  VisitorController.deleteVisitor
);

export const VisitorRoute = router;
