"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRoutes = void 0;
const express_1 = require("express");
const request_controller_1 = require("./request.controller");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/my", (0, authGuard_1.default)(client_1.UserRole.DONOR), request_controller_1.RequestControoler.myBloodRequest);
router.get("/me", (0, authGuard_1.default)(client_1.UserRole.DONOR), request_controller_1.RequestControoler.offeredMeBloodRequest);
router.get("/:id", (0, authGuard_1.default)(client_1.UserRole.DONOR, client_1.UserRole.ADMIN), request_controller_1.RequestControoler.getSingleRequestReceiver);
router.post("/", (0, authGuard_1.default)(client_1.UserRole.DONOR), request_controller_1.RequestControoler.bloodRequest);
router.patch("/status/:id", (0, authGuard_1.default)(client_1.UserRole.DONOR, client_1.UserRole.ADMIN), request_controller_1.RequestControoler.bloodRequestStatusChange);
exports.RequestRoutes = router;
