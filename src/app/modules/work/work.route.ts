import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { WorkController } from './work.controller';
import { WorkValidation } from './work.validation';

const router = express.Router();

router.get('/:id', WorkController.getSingleWork);
router.get('/', WorkController.getAllWork);
router.post( 
  '/create-work',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = WorkValidation.createWorkValidation.parse(
      JSON.parse(req.body.data)
    );
    return WorkController.createWork(req, res, next);
  }
);
router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(WorkValidation.updateWorkValidation),
  WorkController.updateWork
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  WorkController.deleteWork
);

export const WorkRoute = router;
