/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmailRecord, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { emailRecordSearchableFields } from './emailRecord.constant';
import { IEmailRecordFilters } from './emailRecord.interface';

const createEmailRecord = async (
  emailRecordData: EmailRecord
): Promise<EmailRecord> => {
  const result = await prisma.emailRecord.create({
    data: emailRecordData,
  });
  return result;
};

const getAllEmailRecord = async (
  filters: IEmailRecordFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<EmailRecord[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: emailRecordSearchableFields.map(field => ({
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
  const whereConditions: Prisma.EmailRecordWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.emailRecord.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.emailRecord.count({
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

const deleteEmailRecord = async (id: string): Promise<EmailRecord> => {
  const result = await prisma.emailRecord.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const EmailRecordService = {
  createEmailRecord,
  getAllEmailRecord,
  deleteEmailRecord,
};
