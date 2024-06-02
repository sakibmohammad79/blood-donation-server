"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRoutes = void 0;
const express_1 = require("express");
const donor_controller_1 = require("./donor.controller");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.DONOR), donor_controller_1.DonorController.getAllDonor);
router.get("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.DONOR), donor_controller_1.DonorController.getSingleDonor);
router.delete("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), donor_controller_1.DonorController.donorDelete);
router.patch("/soft-delete/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), donor_controller_1.DonorController.donorSoftDelete);
router.patch("/status/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), donor_controller_1.DonorController.statusChange);
router.patch("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.DONOR), donor_controller_1.DonorController.updateDonor);
exports.DonorRoutes = router;
