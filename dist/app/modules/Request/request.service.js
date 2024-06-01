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
exports.RequestService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bloodRequestIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    //check user exists
    const requesterUserData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    //check donor exists
    const donorData = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            email: requesterUserData.email,
            isDeleted: false,
        },
    });
    const bloodRequestData = req.body;
    bloodRequestData.requesterId = donorData.id;
    const result = yield prisma_1.default.request.create({
        data: bloodRequestData,
    });
    return result;
});
const getMyBloodRequestIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield prisma_1.default.request.findMany({
        where: {
            requesterEmail: user.email,
        },
    });
    return result;
});
const getOfferedMeBloodRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    console.log(user);
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id: user.userId,
        },
    });
    const donorData = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            email: userData.email,
        },
    });
    console.log(donorData);
    const offeredMeRequestData = yield prisma_1.default.request.findMany({
        where: {
            receiverId: donorData.id,
        },
    });
    console.log(offeredMeRequestData);
    return offeredMeRequestData;
});
const bloodRequestStatusChange = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { id } = req.params;
    const { status } = req.query;
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id: user.userId,
        },
    });
    const donorData = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            email: userData.email,
        },
    });
    const offeredMeRequest = yield prisma_1.default.request.findFirstOrThrow({
        where: {
            receiverId: donorData.id,
            requesterId: id,
        },
    });
    let offeredMeRequestUpdate;
    if (status === client_1.RequestStatus.APPROVED) {
        offeredMeRequestUpdate = yield prisma_1.default.request.update({
            where: {
                id: offeredMeRequest.id,
            },
            data: {
                status: client_1.RequestStatus.APPROVED,
            },
        });
    }
    if (status === client_1.RequestStatus.REJECTED) {
        offeredMeRequestUpdate = yield prisma_1.default.request.updateMany({
            where: {
                id: offeredMeRequest.id,
            },
            data: {
                status: client_1.RequestStatus.REJECTED,
            },
        });
    }
    if (status === client_1.RequestStatus.PENDING) {
        offeredMeRequestUpdate = yield prisma_1.default.request.updateMany({
            where: {
                id: offeredMeRequest.id,
            },
            data: {
                status: client_1.RequestStatus.PENDING,
            },
        });
    }
    return offeredMeRequestUpdate;
});
const getSingleRequestReceiver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.request.findFirstOrThrow({
        where: {
            receiverId: id,
        },
    });
    const donorInfo = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            id: result.receiverId,
        },
    });
    return donorInfo;
});
exports.RequestService = {
    bloodRequestIntoDB,
    getMyBloodRequestIntoDB,
    getOfferedMeBloodRequest,
    bloodRequestStatusChange,
    getSingleRequestReceiver,
};
