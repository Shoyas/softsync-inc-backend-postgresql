import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { emailRecordFilterableFields } from './emailRecord.constant';
import { EmailRecordService } from './emailRecord.service';

const createEmailRecord = catchAsync(async (req: Request, res: Response) => {
  const result = await EmailRecordService.createEmailRecord(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Email recorded',
    data: result,
  });
});

const getAllEmailRecord = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, emailRecordFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EmailRecordService.getAllEmailRecord(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recorded email retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const deleteEmailRecord = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmailRecordService.deleteEmailRecord(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recorded email deleted successfully',
    data: result,
  });
});

export const EmailRecordController = {
  createEmailRecord,
  getAllEmailRecord,
  deleteEmailRecord,
};
