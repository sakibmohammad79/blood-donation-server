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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createReviewInotDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.userId,
        },
    });
    const donorData = yield prisma_1.default.donor.findFirstOrThrow({
        where: {
            email: userData.email,
        },
    });
    const reviewData = req.body;
    reviewData.name = donorData.name;
    reviewData.donorId = donorData.id;
    reviewData.photo =
        donorData.photo ||
            "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg";
    reviewData.address = donorData.location;
    const result = yield prisma_1.default.review.create({
        data: reviewData,
    });
    return result;
});
const getAllReviewFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({});
    return result;
});
exports.ReviewService = {
    createReviewInotDB,
    getAllReviewFromDB,
};
