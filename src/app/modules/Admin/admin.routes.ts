import { Router } from "express";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", Guard(UserRole.ADMIN), AdminController.getAllAdmin);

export const AdminRoutes = router;
