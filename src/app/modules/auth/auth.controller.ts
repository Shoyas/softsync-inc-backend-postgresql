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

export const AuthController = {
  loginAdmin,
};
