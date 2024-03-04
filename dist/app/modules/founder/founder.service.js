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
exports.FounderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const founder_constant_1 = require("./founder.constant");
const createFounder = (founderData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFounderImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedFounderImage) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
    }
    const result = yield prisma_1.default.founder.create({
        data: Object.assign(Object.assign({}, founderData), { founderPersonImg: uploadedFounderImage.secure_url }),
        include: {
            author: true,
        },
    });
    return result;
});
const getAllFounder = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: founder_constant_1.founderSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.founder.findMany({
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
    const total = yield prisma_1.default.founder.count({
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
const getSingleFounder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.founder.findUnique({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    });
    return result;
});
const updateFounder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.founder.update({
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
const deleteFounder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.founder.delete({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    });
    return result;
});
exports.FounderService = {
    createFounder,
    getAllFounder,
    getSingleFounder,
    updateFounder,
    deleteFounder,
};
