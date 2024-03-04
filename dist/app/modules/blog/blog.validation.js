"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    blogTitle: zod_1.z.string({
        required_error: 'Title is required',
    }),
    blogContent: zod_1.z.string({
        required_error: 'Content is required',
    }),
    blogImg: zod_1.z.string().optional(),
    authorId: zod_1.z.string({
        required_error: 'Admin ID is required',
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        blogTitle: zod_1.z.string().optional(),
        blogContent: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidation,
    updateBlogValidation,
};
