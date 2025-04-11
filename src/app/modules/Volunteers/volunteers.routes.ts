import { UserRole } from "@prisma/client";
import { Router } from "express";
import Guard from "../../middleware/authGuard";
import { VolunteerController } from "./volunteers.controller";


const router = Router();

router.get(
  "/", VolunteerController.getAllVoluteer
);
router.post("/create-volunteer", Guard(UserRole.ADMIN), VolunteerController.createVolunteer);
router.patch("/active-volunteer/:id", Guard(UserRole.ADMIN), VolunteerController.activeVolunteer);
router.patch("/inactive-volunteer/:id", Guard(UserRole.ADMIN), VolunteerController.inactiveVolunteer);
router.delete("/delete-volunteer/:id", Guard(UserRole.ADMIN), VolunteerController.deleteVolunteer);

export const VolunteerRoutes = router;
