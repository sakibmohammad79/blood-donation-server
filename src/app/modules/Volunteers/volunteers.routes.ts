import { UserRole } from "@prisma/client";
import { Router } from "express";
import Guard from "../../middleware/authGuard";
import { VolunteerController } from "./volunteers.controller";


const router = Router();

// router.get(
//   "/me",
//   Guard(UserRole.ADMIN),
//   UserController.getMyProfile
// );

// router.post("/create-donor", UserController.createDonor);

router.post("/create-volunteer", Guard(UserRole.ADMIN), VolunteerController.createVolunteer);

export const VolunteerRoutes = router;
