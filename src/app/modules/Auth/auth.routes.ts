import { Router } from "express";
import { AuthController } from "./auth.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/login", AuthController.loginUser);

router.post(
  "/password-change",
  Guard(UserRole.ADMIN, UserRole.DONOR),
  AuthController.passowrdChange
);

export const AuthRoutes = router;
