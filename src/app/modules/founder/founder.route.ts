import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FounderController } from './founder.controller';
import { FounderValidation } from './founder.validation';

const router = express.Router();

router.get('/:id', FounderController.getSingleFounder);
router.get('/', FounderController.getAllFounder);
router.post(
  '/create-founder',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = FounderValidation.createFounderValidation.parse(
      JSON.parse(req.body.data)
    );
    return FounderController.createFounder(req, res, next);
  }
);

router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(FounderValidation.updateFounderValidation),
  FounderController.updateFounder
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FounderController.deleteFounder
);

export const FounderRoute = router;
