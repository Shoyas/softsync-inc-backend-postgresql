import express, { NextFunction, Request, Response } from 'express';
import { ENUM_ADMIN_ROLE } from '../../../enums/admin';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TeamMemberController } from './teamMember.controller';
import { TeamMemberValidation } from './teamMember.validation';

const router = express.Router();

router.get('/:id', TeamMemberController.getSingleTeamMember);
router.get('/', TeamMemberController.getAllTeamMember);
router.post(
  '/create-team-member',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = TeamMemberValidation.createTeamMemberValidation.parse(
      JSON.parse(req.body.data)
    );
    return TeamMemberController.createTeamMember(req, res, next);
  }
);

router.patch(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(TeamMemberValidation.updateTeamMemberValidation),
  TeamMemberController.updateTeamMember
);

router.delete(
  '/:id',
  auth(ENUM_ADMIN_ROLE.ADMIN, ENUM_ADMIN_ROLE.SUPER_ADMIN),
  TeamMemberController.deleteTeamMember
);

export const TeamMemberRoute = router;
