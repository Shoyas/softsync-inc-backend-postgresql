/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Work } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { workSearchableFields } from './work.constant';
import { IWorkFilters } from './work.interface';

const createWork = async (workData: Work, file: IUploadFile): Promise<Work> => {
  const uploadedWorkImage = await FileUploadHelper.uploadToCloudinary(file);

  if (!uploadedWorkImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.work.create({
    data: {
      ...workData,
      workImg: uploadedWorkImage.secure_url as string,
    },
    include: {
      author: true,
    },
  });

  return result;
};

const getAllWork = async (
  filters: IWorkFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Work[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  console.log(page);
  if (searchTerm) {
    andConditions.push({
      OR: workSearchableFields.map(field => ({
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
  const whereConditions: Prisma.WorkWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.work.findMany({
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

  const total = await prisma.work.count({
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

const getSingleWork = async (id: string): Promise<Work | null> => {
  const result = await prisma.work.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const updateWork = async (
  id: string,
  payload: Partial<Work>
): Promise<Work> => {
  const result = await prisma.work.update({
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

const deleteWork = async (id: string): Promise<Work> => {
  const result = await prisma.work.delete({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

export const WorkService = {
  createWork,
  getAllWork,
  getSingleWork,
  updateWork,
  deleteWork,
};
