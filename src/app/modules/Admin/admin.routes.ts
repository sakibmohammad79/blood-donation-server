import { Router } from "express";
import Guard from "../../middleware/authGuard";
import { UserRole } from "@prisma/client";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", Guard(UserRole.ADMIN), AdminController.getAllAdmin);

router.get("/:id", Guard(UserRole.ADMIN), AdminController.getSingleAdmin);

router.delete("/:id", Guard(UserRole.ADMIN), AdminController.adminDelete);

router.patch(
  "/soft-delete/:id",
  Guard(UserRole.ADMIN),
  AdminController.adminSoftDelete
);
router.patch(
  "/status/:id",
  Guard(UserRole.ADMIN),
  AdminController.statusChange
);

router.patch("/:id", Guard(UserRole.ADMIN), AdminController.updateAdmin);

export const AdminRoutes = router;
