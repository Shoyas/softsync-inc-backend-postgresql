"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const teamMember_controller_1 = require("./teamMember.controller");
const teamMember_validation_1 = require("./teamMember.validation");
const router = express_1.default.Router();
router.get('/:id', teamMember_controller_1.TeamMemberController.getSingleTeamMember);
router.get('/', teamMember_controller_1.TeamMemberController.getAllTeamMember);
router.post('/create-team-member', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = teamMember_validation_1.TeamMemberValidation.createTeamMemberValidation.parse(JSON.parse(req.body.data));
    return teamMember_controller_1.TeamMemberController.createTeamMember(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(teamMember_validation_1.TeamMemberValidation.updateTeamMemberValidation), teamMember_controller_1.TeamMemberController.updateTeamMember);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), teamMember_controller_1.TeamMemberController.deleteTeamMember);
exports.TeamMemberRoute = router;
