import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.get('/:id', ServiceController.getSingleService);
router.get('/', ServiceController.getAllService);
router.post(
  '/create-service',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ServiceValidation.createServiceValidation.parse(
      JSON.parse(req.body.data)
    );
    return ServiceController.createService(req, res, next);
  }
);
router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.updateServiceValidation),
  ServiceController.updateService
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  ServiceController.deleteService
);

export const ServiceRoute = router;
