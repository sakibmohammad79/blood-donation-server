import { Router } from "express";
import { RequestControoler } from "./request.controller";

const router = Router();

router.post("/", RequestControoler.bloodRequest);

export const RequestRoutes = router;
