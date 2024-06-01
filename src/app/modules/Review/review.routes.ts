import { Router } from "express";
import { ReviewController } from "./review.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", ReviewController.getAllReview);

router.post("/", Guard(UserRole.DONOR), ReviewController.createReivew);

export const ReviewRoutes = router;
