"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderValidation = void 0;
const zod_1 = require("zod");
const createFounderValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    founderPersonImg: zod_1.z.string().optional(),
    designation: zod_1.z.string({
        required_error: 'Designation is required',
    }),
    linkedin: zod_1.z.string().optional(),
    github: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    portfolio: zod_1.z.string().optional(),
    authorId: zod_1.z.string({
        required_error: 'Admin ID is required',
    }),
});
const updateFounderValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        founderPersonImg: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        linkedin: zod_1.z.string().optional(),
        github: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        portfolio: zod_1.z.string().optional(),
    }),
});
exports.FounderValidation = {
    createFounderValidation,
    updateFounderValidation,
};
