import { Router } from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { DonorRoutes } from "../modules/Donor/donor.routes";
import { RequestRoutes } from "../modules/Request/request.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/donor",
    route: DonorRoutes,
  },
  {
    path: "/request",
    route: RequestRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
