"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidation = zod_1.z.object({
    categoryTitle: zod_1.z.string({
        required_error: 'Title is required',
    }),
    categoryDescription: zod_1.z.string({
        required_error: 'Description is required',
    }),
    categoryImg: zod_1.z.string().optional(),
});
const updateCategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        categoryTitle: zod_1.z.string().optional(),
        categoryDescription: zod_1.z.string().optional(),
    }),
});
exports.CategoryValidation = {
    createCategoryValidation,
    updateCategoryValidation,
};
