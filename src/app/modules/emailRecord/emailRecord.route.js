"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRecordRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const emailRecord_controller_1 = require("./emailRecord.controller");
const emailRecord_validation_1 = require("./emailRecord.validation");
const router = express_1.default.Router();
router.get('/:id', emailRecord_controller_1.EmailRecordController.getSingleEmailRecord);
router.get('/', emailRecord_controller_1.EmailRecordController.getAllEmailRecord);
router.post('/create-email-record', (0, validateRequest_1.default)(emailRecord_validation_1.EmailRecordValidation.createEmailRecordValidation), emailRecord_controller_1.EmailRecordController.createEmailRecord);
router.delete('/:id', emailRecord_controller_1.EmailRecordController.deleteEmailRecord);
exports.EmailRecordRoute = router;
