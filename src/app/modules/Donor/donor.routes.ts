import { Router } from "express";
import { DonorController } from "./donor.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/all-donor", DonorController.getAllDonor);

router.get("/", Guard(UserRole.DONOR), DonorController.getAllDonorWithOutMe);

router.get(
  "/:id",
  Guard(UserRole.ADMIN, UserRole.DONOR),
  DonorController.getSingleDonor
);

router.delete("/:id", Guard(UserRole.ADMIN), DonorController.donorDelete);

router.patch(
  "/soft-delete/:id",
  Guard(UserRole.ADMIN),
  DonorController.donorSoftDelete
);

router.patch(
  "/status/:id",
  Guard(UserRole.ADMIN),
  DonorController.statusChange
);

router.patch(
  "/:id",
  Guard(UserRole.ADMIN, UserRole.DONOR),
  DonorController.updateDonor
);

export const DonorRoutes = router;
