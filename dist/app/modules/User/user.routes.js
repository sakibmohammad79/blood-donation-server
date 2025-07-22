"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/me", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.DONOR), user_controller_1.UserController.getMyProfile);
router.post("/create-donor", user_controller_1.UserController.createDonor);
router.post("/create-admin", 
//  Guard(UserRole.ADMIN),
user_controller_1.UserController.createAdmin);
exports.UserRoutes = router;
