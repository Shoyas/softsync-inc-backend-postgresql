import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { workFilterableFields } from './work.constant';
import { WorkService } from './work.service';

const createWork = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file as IUploadFile;
  const result = await WorkService.createWork(payload, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Work is created successfully',
    data: result,
  });
});

const getAllWork = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, workFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await WorkService.getAllWork(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Work retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleWork = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkService.getSingleWork(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Work fetched successfully',
    data: result,
  });
});

const updateWork = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await WorkService.updateWork(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Work updated successfully',
    data: result,
  });
});

const deleteWork = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WorkService.deleteWork(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Work deleted successfully',
    data: result,
  });
});

export const WorkController = {
  createWork,
  getAllWork,
  getSingleWork,
  updateWork,
  deleteWork,
};
