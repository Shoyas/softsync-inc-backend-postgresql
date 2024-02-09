import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginAdmin, ILoginAdminResponse } from './auth.interface';

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

export const AuthService = {
  loginAdmin,
};
