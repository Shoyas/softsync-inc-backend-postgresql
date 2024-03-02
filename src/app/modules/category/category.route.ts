import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.get('/:id', CategoryController.getSingleCategory);
router.get('/', CategoryController.getAllCategory);
router.post(
  '/create-category',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategoryValidation.parse(
      JSON.parse(req.body.data)
    );
    return CategoryController.createCategory(req, res, next);
  }
);

router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidation),
  CategoryController.updateCategory
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoute = router;
