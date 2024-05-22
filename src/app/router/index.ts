import { Router } from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { DonorRoutes } from "../modules/Donor/donor.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
