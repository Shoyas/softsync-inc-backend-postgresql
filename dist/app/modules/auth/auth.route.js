"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.get('/profile', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.getSingleAdminByToken);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginAdminValidation), auth_controller_1.AuthController.loginAdmin);
router.post('/change-password', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidation), auth_controller_1.AuthController.changePassword);
exports.AuthRoute = router;
