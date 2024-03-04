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
exports.AdminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const admin_constant_1 = require("./admin.constant");
const createAdmin = (adminData, file) => __awaiter(void 0, void 0, void 0, function* () {
    //! Hashing password
    adminData.password = yield bcrypt_1.default.hash(adminData.password, Number(config_1.default.bycrypt_salt_rounds));
    const uploadedAdminImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedAdminImage) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
    }
    const result = yield prisma_1.default.admin.create({
        data: Object.assign(Object.assign({}, adminData), { adminImg: uploadedAdminImage.secure_url }),
    });
    return result;
});
const getAllAdmin = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: admin_constant_1.adminSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.admin.count({
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
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.AdminService = {
    createAdmin,
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
