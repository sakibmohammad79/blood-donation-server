import { Router } from "express";
import { ReviewController } from "./review.controller";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", ReviewController.getAllReview);

router.post("/", Guard(UserRole.DONOR), ReviewController.createReivew);

router.patch("/approved-review/:id", Guard(UserRole.ADMIN), ReviewController.approvedReview );

router.delete("/delete-review/:id", Guard(UserRole.ADMIN), ReviewController.deleteReview );

export const ReviewRoutes = router;
