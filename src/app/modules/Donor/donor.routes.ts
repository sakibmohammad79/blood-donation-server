import { Router } from "express";
import { DonorController } from "./donor.controller";

const router = Router();

router.get("/", DonorController.getAllDonor);

export const DonorRoutes = router;
