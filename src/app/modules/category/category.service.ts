/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categorySearchableFields } from './category.constant';
import { ICategoryFilters } from './category.interface';

const createCategory = async (
  categoryData: Category,
  file: IUploadFile
): Promise<Category> => {
  const uploadedCategoryImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedCategoryImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.category.create({
    data: {
      ...categoryData,
      categoryImg: uploadedCategoryImage.secure_url as string,
    },
    include: {
      Service: true,
    },
  });

  return result;
};

const getAllCategory = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
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
  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.category.findMany({
    include: {
      Service: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.category.count({
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

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      Service: true,
    },
  });
  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    include: {
      Service: true,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
    include: {
      Service: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
