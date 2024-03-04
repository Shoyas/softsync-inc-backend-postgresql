"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const createAdminValidation = zod_1.z.object({
    userName: zod_1.z.string({
        required_error: 'Name is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
    securityCode: zod_1.z.number({
        required_error: 'Security Code is required',
    }),
    adminImg: zod_1.z.string().optional(),
    role: zod_1.z.enum([...admin_constant_1.adminRoleEnum], {
        required_error: 'Role is required',
    }),
});
exports.AdminValidation = {
    createAdminValidation,
};
