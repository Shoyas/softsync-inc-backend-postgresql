"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberValidation = void 0;
const zod_1 = require("zod");
const createTeamMemberValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    teamPersonImg: zod_1.z.string().optional(),
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
const updateTeamMemberValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        teamPersonImg: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        linkedin: zod_1.z.string().optional(),
        github: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        portfolio: zod_1.z.string().optional(),
    }),
});
exports.TeamMemberValidation = {
    createTeamMemberValidation,
    updateTeamMemberValidation,
};
