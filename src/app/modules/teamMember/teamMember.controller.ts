import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { teamMemberFilterableFields } from './teamMember.constant';
import { TeamMemberService } from './teamMember.service';

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body; 
  const file = req.file as IUploadFile;
  const result = await TeamMemberService.createTeamMember(payload, file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team member is created successfully',
    data: result,
  });
});

const getAllTeamMember = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, teamMemberFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TeamMemberService.getAllTeamMember(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team member retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamMemberService.getSingleTeamMember(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team member fetched successfully',
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await TeamMemberService.updateTeamMember(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team member updated successfully',
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamMemberService.deleteTeamMember(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Team member deleted successfully',
    data: result,
  });
});

export const TeamMemberController = {
  createTeamMember,
  getAllTeamMember,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
