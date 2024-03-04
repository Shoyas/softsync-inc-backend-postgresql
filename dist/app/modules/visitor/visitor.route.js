"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_1 = require("../../../enums/admin");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const visitor_controller_1 = require("./visitor.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), visitor_controller_1.VisitorController.getAllVisitor);
router.post('/create-visitor', visitor_controller_1.VisitorController.createVisitor);
router.delete('/:id', (0, auth_1.default)(admin_1.ENUM_ADMIN_ROLE.ADMIN, admin_1.ENUM_ADMIN_ROLE.SUPER_ADMIN), visitor_controller_1.VisitorController.deleteVisitor);
exports.VisitorRoute = router;
