import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router(); 

router.get('/:id', BlogController.getSingleBlog);
router.get('/', BlogController.getAllBlog);
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
router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidation.updateBlogValidation),
  BlogController.updateBlog
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  BlogController.deleteBlog
);
 
export const BlogRoute = router;
