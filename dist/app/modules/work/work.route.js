"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const work_controller_1 = require("./work.controller");
const work_validation_1 = require("./work.validation");
const router = express_1.default.Router();
router.get('/:id', work_controller_1.WorkController.getSingleWork);
router.get('/', work_controller_1.WorkController.getAllWork);
router.post('/create-work', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = work_validation_1.WorkValidation.createWorkValidation.parse(JSON.parse(req.body.data));
    return work_controller_1.WorkController.createWork(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(work_validation_1.WorkValidation.updateWorkValidation), work_controller_1.WorkController.updateWork);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), work_controller_1.WorkController.deleteWork);
exports.WorkRoute = router;
