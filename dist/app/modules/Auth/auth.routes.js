"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.loginUser);
router.post("/password-change", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.DONOR), auth_controller_1.AuthController.passowrdChange);
exports.AuthRoutes = router;
