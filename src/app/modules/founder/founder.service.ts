/* eslint-disable @typescript-eslint/no-explicit-any */
import { Founder, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { founderSearchableFields } from './founder.constant';
import { IFounderFilters } from './founder.interface';

const createFounder = async (
  founderData: Founder,
  file: IUploadFile
): Promise<Founder> => {
  const uploadedFounderImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedFounderImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.founder.create({
    data: {
      ...founderData,
      founderPersonImg: uploadedFounderImage.secure_url as string,
    },
    include: {
      author: true,
    },
  });

  return result;
};

const getAllFounder = async (
  filters: IFounderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Founder[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: founderSearchableFields.map(field => ({
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
  const whereConditions: Prisma.FounderWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.founder.findMany({
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

  const total = await prisma.founder.count({
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

const getSingleFounder = async (id: string): Promise<Founder | null> => {
  const result = await prisma.founder.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const updateFounder = async (
  id: string,
  payload: Partial<Founder>
): Promise<Founder> => {
  const result = await prisma.founder.update({
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

const deleteFounder = async (id: string): Promise<Founder> => {
  const result = await prisma.founder.delete({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

export const FounderService = {
  createFounder,
  getAllFounder,
  getSingleFounder,
  updateFounder,
  deleteFounder,
};
