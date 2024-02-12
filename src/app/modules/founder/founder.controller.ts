import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { founderFilterableFields } from './founder.constant';
import { FounderService } from './founder.service';

const createFounder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file as IUploadFile;
  const result = await FounderService.createFounder(payload, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Founder is created successfully',
    data: result,
  });
});

const getAllFounder = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, founderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FounderService.getAllFounder(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Founder retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFounder = catchAsync(async (req: Request, res: Response) => {
  const result = await FounderService.getSingleFounder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Founder fetched successfully',
    data: result,
  });
});

const updateFounder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FounderService.updateFounder(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Founder updated successfully',
    data: result,
  });
});

const deleteFounder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FounderService.deleteFounder(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Founder deleted successfully',
    data: result,
  });
});

export const FounderController = {
  createFounder,
  getAllFounder,
  getSingleFounder,
  updateFounder,
  deleteFounder,
};
