"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.get('/:id', category_controller_1.CategoryController.getSingleCategory);
router.get('/', category_controller_1.CategoryController.getAllCategory);
router.post('/create-category', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = category_validation_1.CategoryValidation.createCategoryValidation.parse(JSON.parse(req.body.data));
    return category_controller_1.CategoryController.createCategory(req, res, next);
});
router.patch('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryValidation), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoute = router;
