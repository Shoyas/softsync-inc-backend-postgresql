"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkValidation = void 0;
const zod_1 = require("zod");
const createWorkValidation = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }),
    workImg: zod_1.z.string().optional(),
    authorId: zod_1.z.string({
        required_error: 'Admin ID is required',
    }),
});
const updateWorkValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.WorkValidation = {
    createWorkValidation,
    updateWorkValidation,
};
