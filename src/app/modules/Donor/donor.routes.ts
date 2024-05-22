import { Router } from "express";
import { DonorController } from "./donor.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  Guard(UserRole.ADMIN, UserRole.DONOR),
  DonorController.getAllDonor
);

export const DonorRoutes = router;
