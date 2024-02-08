import { Blog } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';

const createBlog = async (blogData: Blog, file: IUploadFile): Promise<Blog> => {
  const uploadedBlogImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedBlogImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.blog.create({
    data: {
      ...blogData,
      blogImg: uploadedBlogImage.secure_url as string,
    },
    include: {
      author: true,
    },
  });

  return result;
};

export const BlogService = {
  createBlog,
};
