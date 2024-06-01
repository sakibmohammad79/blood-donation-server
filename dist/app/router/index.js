"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/User/user.routes");
const donor_routes_1 = require("../modules/Donor/donor.routes");
const request_routes_1 = require("../modules/Request/request.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const review_routes_1 = require("../modules/Review/review.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/donor",
        route: donor_routes_1.DonorRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: "/request",
        route: request_routes_1.RequestRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/review",
        route: review_routes_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
