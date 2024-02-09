import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file as IUploadFile;
  const result = await AdminService.createAdmin(payload, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Admin is getting successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getSingleAdmin(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Getting single admin successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AdminService.updateAdmin(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
