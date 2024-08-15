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
exports.RequestControoler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const request_service_1 = require("./request.service");
const allRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.getAllRequest();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All blood request fetch successfully!",
        data: result,
    });
}));
const allApprovedRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.getAllApprovedRequest();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All approved request fetch successfully!",
        data: result,
    });
}));
const bloodRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.bloodRequestIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blood request send successfully!",
        data: result,
    });
}));
const myBloodRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.getMyBloodRequestIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My Blood request data fetched successfully!",
        data: result,
    });
}));
const offeredMeBloodRequest = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.getOfferedMeBloodRequest(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Offered me blood request data fetched successfully!",
        data: result,
    });
}));
const bloodRequestStatusChange = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request_service_1.RequestService.bloodRequestStatusChange(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Offered me blood request status update!",
        data: result,
    });
}));
const getSingleRequestReceiver = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield request_service_1.RequestService.getSingleRequestReceiver(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single blood request reciever fetch!",
        data: result,
    });
}));
exports.RequestControoler = {
    allRequest,
    allApprovedRequest,
    bloodRequest,
    myBloodRequest,
    offeredMeBloodRequest,
    bloodRequestStatusChange,
    getSingleRequestReceiver,
};
