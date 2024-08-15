"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const apiNotFoundHandler_1 = require("./app/middleware/apiNotFoundHandler");
const app = (0, express_1.default)();
//parser
app.use((0, cors_1.default)({
    origin: "https://blood-donation-client-one.vercel.app",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//application route
app.use("/api/v1", router_1.default);
app.get("/", (req, res) => {
    res.send({
        message: "Welcome blood donation application!",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(apiNotFoundHandler_1.apiNotFoundHandler);
exports.default = app;
//bloodCaresa79kib..
//DATABASE_URL=postgresql://postgres:YTjaaDPaULOHdGDqtnFIObTlGnByzofy@monorail.proxy.rlwy.net:26093/railway
//DATABASE_URL=postgres://postgres.snpiuhfryrlvzmyratse:bloodCaresa79kib..@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
//https://blood-donation-client-one.vercel.app
//http://localhost:3000
