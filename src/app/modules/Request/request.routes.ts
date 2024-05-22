import { Router } from "express";
import { RequestControoler } from "./request.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/my", Guard(UserRole.DONOR), RequestControoler.myBloodRequest);

router.get(
  "/me",
  Guard(UserRole.DONOR),
  RequestControoler.offeredMeBloodRequest
);

router.post("/", Guard(UserRole.DONOR), RequestControoler.bloodRequest);

export const RequestRoutes = router;
