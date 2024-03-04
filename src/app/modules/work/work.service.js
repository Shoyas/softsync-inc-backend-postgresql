"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const work_constant_1 = require("./work.constant");
const createWork = (workData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedWorkImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedWorkImage) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
    }
    const result = yield prisma_1.default.work.create({
        data: Object.assign(Object.assign({}, workData), { workImg: uploadedWorkImage.secure_url }),
        include: {
            author: true,
        },
    });
    return result;
});
const getAllWork = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: work_constant_1.workSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0
        ? {
            AND: andConditions,
        }
        : {};
    const result = yield prisma_1.default.work.findMany({
        include: {
            author: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.work.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleWork = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.work.findUnique({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    });
    return result;
});
const updateWork = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.work.update({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
        data: payload,
    });
    return result;
});
const deleteWork = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.work.delete({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    });
    return result;
});
exports.WorkService = {
    createWork,
    getAllWork,
    getSingleWork,
    updateWork,
    deleteWork,
};
