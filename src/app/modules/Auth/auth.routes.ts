import { Router } from "express";
import { AuthController } from "./auth.controller";
import Guard from "../../middleware/authGuard";

const router = Router();

router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
