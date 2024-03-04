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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = payload;
    //! Finding user by userName
    const admin = yield prisma_1.default.admin.findUnique({
        where: {
            userName: userName,
        },
    });
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This admin does not exist');
    }
    //! Matching password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, admin.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //! Create access token & refresh token
    const { id: adminId, role } = admin;
    const token = jwtHelpers_1.jwtHelpers.createToken({ adminId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ adminId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        userName: userName,
        token,
        refreshToken,
    };
});
const getSingleAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Token not founded in headers');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid token');
    }
    const { adminId } = verifiedToken;
    const result = yield prisma_1.default.admin.findUnique({
        where: {
            id: adminId,
        },
    });
    return result;
});
const changePassword = (admin, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isAdminExist = yield prisma_1.default.admin.findUnique({
        where: {
            id: admin === null || admin === void 0 ? void 0 : admin.adminId,
        },
    });
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    //! Checking old password
    if (isAdminExist.password &&
        !(yield bcrypt_1.default.compare(oldPassword, isAdminExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    //! Set new password
    // Hashing password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    // Update password
    const result = yield prisma_1.default.admin.update({
        where: {
            id: isAdminExist.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return result;
});
exports.AuthService = {
    loginAdmin,
    getSingleAdminByToken,
    changePassword,
};
