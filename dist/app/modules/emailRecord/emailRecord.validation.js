"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRecordValidation = void 0;
const zod_1 = require("zod");
const createEmailRecordValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        message: zod_1.z.string({
            required_error: 'Message is required',
        }),
    }),
});
exports.EmailRecordValidation = {
    createEmailRecordValidation,
};
