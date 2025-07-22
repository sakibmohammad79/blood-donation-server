"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", review_controller_1.ReviewController.getAllReview);
router.post("/", (0, authGuard_1.default)(client_1.UserRole.DONOR), review_controller_1.ReviewController.createReivew);
router.patch("/approved-review/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), review_controller_1.ReviewController.approvedReview);
router.delete("/delete-review/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
