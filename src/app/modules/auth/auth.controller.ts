import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginAdminResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginAdmin(req.body);
  const { refreshToken } = result;

  //! Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginAdminResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin logged in successfully',
    data: result,
  });
});

const getSingleAdminByToken = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: 'Token is not founded in headers',
      });
    }
    const tokenString = Array.isArray(token) ? token[0] : token.toString();

    const result = await AuthService.getSingleAdminByToken(tokenString);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin is retrieved successfully',
      data: result,
    });
  }
);
 
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const admin = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(admin, passwordData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password change successfully',
    data: result,
  });
});

export const AuthController = {
  loginAdmin,
  getSingleAdminByToken,
  changePassword,
};
