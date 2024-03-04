"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const founder_controller_1 = require("./founder.controller");
const founder_validation_1 = require("./founder.validation");
const router = express_1.default.Router();
router.get('/:id', founder_controller_1.FounderController.getSingleFounder);
router.get('/', founder_controller_1.FounderController.getAllFounder);
router.post('/create-founder', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = founder_validation_1.FounderValidation.createFounderValidation.parse(JSON.parse(req.body.data));
    return founder_controller_1.FounderController.createFounder(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(founder_validation_1.FounderValidation.updateFounderValidation), founder_controller_1.FounderController.updateFounder);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), founder_controller_1.FounderController.deleteFounder);
exports.FounderRoute = router;
