import { Router } from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { DonorRoutes } from "../modules/Donor/donor.routes";
import { RequestRoutes } from "../modules/Request/request.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { ReviewRoutes } from "../modules/Review/review.routes";
import { VolunteerRoutes } from "../modules/Volunteers/volunteers.routes";

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
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/request",
    route: RequestRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/volunteer",
    route: VolunteerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
