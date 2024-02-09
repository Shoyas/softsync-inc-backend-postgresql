import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get(
  '/',
  //! auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmin
);
router.get(
  '/:id',
  //! auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  AdminController.getSingleAdmin
);

router.post(
  '/create-admin',
  //! auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AdminValidation.createAdminValidation.parse(
      JSON.parse(req.body.data)
    );
    return AdminController.createAdmin(req, res, next);
  }
);

router.patch(
  '/:id',
  //! auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  //! auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);

export const AdminRoute = router;
