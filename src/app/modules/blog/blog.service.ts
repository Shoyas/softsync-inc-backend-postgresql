/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { blogSearchableFields } from './blog.constant';
import { IBlogFilters } from './blog.interface';

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

const getAllBlog = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: any = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.blog.findMany({
    include: {
      author: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.blog.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog> => {
  const result = await prisma.blog.update({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.delete({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
