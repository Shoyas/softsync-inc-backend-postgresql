"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceValidation = zod_1.z.object({
    serviceTitle: zod_1.z.string({
        required_error: 'Title is required',
    }),
    authorId: zod_1.z.string({
        required_error: 'Admin ID is required',
    }),
    categoryId: zod_1.z.string({
        required_error: 'Category ID is required',
    }),
});
const updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceTitle: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidation = {
    createServiceValidation,
    updateServiceValidation,
};
