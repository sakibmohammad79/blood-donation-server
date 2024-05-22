import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-donor", UserController.createDonor);

router.post("/create-admin", UserController.createAdmin);

export const UserRoutes = router;
