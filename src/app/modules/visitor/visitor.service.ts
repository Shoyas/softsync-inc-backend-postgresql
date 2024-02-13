/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Visitor } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { visitorSearchableFields } from './visitor.constant';
import { IVisitorFilters } from './visitor.interface';

const createVisitor = async (visitorData: Visitor): Promise<Visitor> => {
  const result = await prisma.visitor.create({
    data: visitorData,
  });
  return result;
};

const getAllVisitor = async (
  filters: IVisitorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Visitor[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: visitorSearchableFields.map(field => ({
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
  const whereConditions: Prisma.VisitorWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.visitor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.visitor.count({
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

const deleteVisitor = async (id: string): Promise<Visitor> => {
  const result = await prisma.visitor.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const VisitorService = {
  createVisitor,
  getAllVisitor,
  deleteVisitor,
};
