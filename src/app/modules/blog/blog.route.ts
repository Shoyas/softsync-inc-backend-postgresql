import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/create-blog',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = BlogValidation.createBlogValidation.parse(
      JSON.parse(req.body.data)
    );
    return BlogController.createBlog(req, res, next);
  }
);

export const BlogRoute = router;
