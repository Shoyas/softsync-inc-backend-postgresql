import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { visitorFilterableFields } from './visitor.constant';
import { VisitorService } from './visitor.service';
 
const createVisitor = catchAsync(async (req: Request, res: Response) => {
  const result = await VisitorService.createVisitor(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Visitor added successfully',
    data: result,
  });
});

const getAllVisitor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, visitorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await VisitorService.getAllVisitor(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Visitor retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const deleteVisitor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VisitorService.deleteVisitor(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Visitor deleted successfully',
    data: result,
  });
});

export const VisitorController = {
  createVisitor,
  getAllVisitor,
  deleteVisitor,
};
