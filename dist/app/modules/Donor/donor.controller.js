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
exports.DonorController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const donor_constant_1 = require("./donor.constant");
const globalConstant_1 = require("../../constant/globalConstant");
const donor_service_1 = require("./donor.service");
const getAllDonor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, donor_constant_1.donorFilterableFields);
    const options = (0, pick_1.default)(req.query, globalConstant_1.paginateOptions);
    const result = yield donor_service_1.DonorService.getAllDonorFromDB(query, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor data fetched successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const getAllDonorWithOutMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, pick_1.default)(req.query, donor_constant_1.donorFilterableFields);
    const options = (0, pick_1.default)(req.query, globalConstant_1.paginateOptions);
    const result = yield donor_service_1.DonorService.getAllDonorFromDBWithOutMe(req, query, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor data fetched with out me successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleDonor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield donor_service_1.DonorService.getSingleDonorFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor data fetched by id!",
        data: result,
    });
}));
const donorDelete = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield donor_service_1.DonorService.donorDeleteIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor deleted successfully!",
        data: result,
    });
}));
const donorSoftDelete = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield donor_service_1.DonorService.donorSoftDeleteIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor soft delete by id!",
        data: result,
    });
}));
const updateDonor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield donor_service_1.DonorService.updateDonorIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor update successfully!",
        data: result,
    });
}));
const statusChange = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = req.query;
    const result = yield donor_service_1.DonorService.donorStatusChagne(id, query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donor status change successfully!",
        data: result,
    });
}));
exports.DonorController = {
    getAllDonor,
    getSingleDonor,
    donorDelete,
    donorSoftDelete,
    updateDonor,
    statusChange,
    getAllDonorWithOutMe,
};
