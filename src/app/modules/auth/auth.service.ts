import { Admin } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  IChangePassword,
  ILoginAdmin,
  ILoginAdminResponse,
} from './auth.interface';

const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { userName, password } = payload;

  //! Finding user by userName
  const admin = await prisma.admin.findUnique({
    where: {
      userName: userName,
    },
  });
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This admin does not exist');
  }
  //! Matching password
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //! Create access token & refresh token
  const { id: adminId, role } = admin;
  const token = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { adminId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    userName: userName,
    token,
    refreshToken,
  };
};

const getSingleAdminByToken = async (
  token: string | undefined
): Promise<Admin | null> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Token not founded in headers');
  }
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
  const { adminId } = verifiedToken;

  const result = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  return result;
};

const changePassword = async (
  admin: JwtPayload | null,
  payload: IChangePassword
): Promise<Admin> => {
  const { oldPassword, newPassword } = payload;
  const isAdminExist = await prisma.admin.findUnique({
    where: {
      id: admin?.adminId,
    },
  });
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
  //! Checking old password
  if (
    isAdminExist.password &&
    !(await bcrypt.compare(oldPassword, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }
  //! Set new password
  // Hashing password
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );
  // Update password
  const result = await prisma.admin.update({
    where: {
      id: isAdminExist.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return result;
};

export const AuthService = {
  loginAdmin,
  getSingleAdminByToken,
  changePassword,
};
