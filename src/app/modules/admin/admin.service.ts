import { Admin } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';

const createAdmin = async (adminData: Admin, file: IUploadFile) => {
  // Hashing password
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

export const AdminService = {
  createAdmin,
};
