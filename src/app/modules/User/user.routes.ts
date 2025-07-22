import { Router } from "express";
import { UserController } from "./user.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/me",
  Guard(UserRole.ADMIN, UserRole.DONOR),
  UserController.getMyProfile
);

router.post("/create-donor", UserController.createDonor);

router.post("/create-admin",
   Guard(UserRole.ADMIN),
    UserController.createAdmin);

export const UserRoutes = router;
