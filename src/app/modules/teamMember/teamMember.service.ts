/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, TeamMember } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { teamMemberSearchableFields } from './teamMember.constant';
import { ITeamMemberFilters } from './teamMember.interface';

const createTeamMember = async (
  teamMemberData: TeamMember,
  file: IUploadFile
): Promise<TeamMember> => {
  const uploadedTeamPersonImage = await FileUploadHelper.uploadToCloudinary(
    file
  );
  if (!uploadedTeamPersonImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.teamMember.create({
    data: {
      ...teamMemberData,
      teamPersonImg: uploadedTeamPersonImage.secure_url as string,
    },
    include: {
      author: true,
    },
  });

  return result;
};

const getAllTeamMember = async (
  filters: ITeamMemberFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TeamMember[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: teamMemberSearchableFields.map(field => ({
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
  const whereConditions: Prisma.TeamMemberWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.teamMember.findMany({
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

  const total = await prisma.teamMember.count({
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

const getSingleTeamMember = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const updateTeamMember = async (
  id: string,
  payload: Partial<TeamMember>
): Promise<TeamMember> => {
  const result = await prisma.teamMember.update({
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

const deleteTeamMember = async (id: string): Promise<TeamMember> => {
  const result = await prisma.teamMember.delete({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

export const TeamMemberService = {
  createTeamMember,
  getAllTeamMember,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
