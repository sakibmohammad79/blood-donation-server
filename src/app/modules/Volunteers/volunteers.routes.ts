import { UserRole } from "@prisma/client";
import { Router } from "express";
import Guard from "../../middleware/authGuard";
import { VolunteerController } from "./volunteers.controller";


const router = Router();

router.get(
  "/", VolunteerController.getAllVoluteer
);
router.post("/create-volunteer", Guard(UserRole.ADMIN), VolunteerController.createVolunteer);
router.patch("/active-volunteer", Guard(UserRole.ADMIN), VolunteerController.activeVolunteer);

export const VolunteerRoutes = router;
