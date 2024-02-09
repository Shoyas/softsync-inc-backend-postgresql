/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { adminSearchableFields } from './admin.constant';
import { IAdminFilters } from './admin.interface';

const createAdmin = async (adminData: Admin, file: IUploadFile) => {
  //! Hashing password
  adminData.password = await bcrypt.hash(
    adminData.password,
    Number(config.bycrypt_salt_rounds)
  );

  const uploadedAdminImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedAdminImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.admin.create({
    data: {
      ...adminData,
      adminImg: uploadedAdminImage.secure_url as string,
    },
  });

  return result;
};

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: any = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.admin.count({
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

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteAdmin = async (id: string): Promise<Admin> => {
  const result = await prisma.admin.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const AdminService = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
