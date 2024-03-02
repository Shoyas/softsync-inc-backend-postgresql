import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EmailRecordController } from './emailRecord.controller';
import { EmailRecordValidation } from './emailRecord.validation';

const router = express.Router();

router.get('/:id', EmailRecordController.getSingleEmailRecord);
router.get('/', EmailRecordController.getAllEmailRecord);
router.post(
  '/create-email-record',
  validateRequest(EmailRecordValidation.createEmailRecordValidation),
  EmailRecordController.createEmailRecord
);
router.delete('/:id', EmailRecordController.deleteEmailRecord);

export const EmailRecordRoute = router;
