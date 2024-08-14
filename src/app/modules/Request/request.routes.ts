import { Router } from "express";
import { RequestControoler } from "./request.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", RequestControoler.allRequest);

router.get("/approved", RequestControoler.allApprovedRequest);

router.get("/my", Guard(UserRole.DONOR), RequestControoler.myBloodRequest);

router.get(
  "/me",
  Guard(UserRole.DONOR),
  RequestControoler.offeredMeBloodRequest
);

router.get(
  "/:id",
  Guard(UserRole.DONOR, UserRole.ADMIN),
  RequestControoler.getSingleRequestReceiver
);

router.post("/", Guard(UserRole.DONOR), RequestControoler.bloodRequest);

router.patch(
  "/status/:id",
  Guard(UserRole.DONOR, UserRole.ADMIN),
  RequestControoler.bloodRequestStatusChange
);

export const RequestRoutes = router;
