"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get("/", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getAllAdmin);
router.get("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.getSingleAdmin);
router.delete("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.adminDelete);
router.patch("/soft-delete/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.adminSoftDelete);
router.patch("/status/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.statusChange);
router.patch("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN), admin_controller_1.AdminController.updateAdmin);
exports.AdminRoutes = router;
