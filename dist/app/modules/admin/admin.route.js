"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.getAllAdmin);
router.get('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.getSingleAdmin);
router.post('/create-admin', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = admin_validation_1.AdminValidation.createAdminValidation.parse(JSON.parse(req.body.data));
    return admin_controller_1.AdminController.createAdmin(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoute = router;
