import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryFilterableFields } from './category.constant';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file as IUploadFile;
  const result = await CategoryService.createCategory(payload, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category is created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CategoryService.getAllCategory(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category fetched successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CategoryService.updateCategory(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategory(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
