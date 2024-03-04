"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginAdminValidation = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({
            required_error: 'Name is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required',
        }),
    }),
});
exports.AuthValidation = {
    loginAdminValidation,
    changePasswordValidation,
};
