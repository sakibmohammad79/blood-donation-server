import { Router } from "express";
import { RequestControoler } from "./request.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", Guard(UserRole.DONOR), RequestControoler.bloodRequest);

export const RequestRoutes = router;
