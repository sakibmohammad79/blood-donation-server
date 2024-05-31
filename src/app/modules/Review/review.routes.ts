import { Router } from "express";
import { ReviewController } from "./review.controller";

const router = Router();

router.get("/", ReviewController.getAllReview);
router.post("/", ReviewController.createReivew);

export const ReviewRoutes = router;
