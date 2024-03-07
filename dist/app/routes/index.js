"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const category_route_1 = require("../modules/category/category.route");
const emailRecord_route_1 = require("../modules/emailRecord/emailRecord.route");
const founder_route_1 = require("../modules/founder/founder.route");
const service_route_1 = require("../modules/service/service.route");
const teamMember_route_1 = require("../modules/teamMember/teamMember.route");
const work_route_1 = require("../modules/work/work.route");
const visitor_route_1 = require("./../modules/visitor/visitor.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/blogs',
        route: blog_route_1.BlogRoute,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/works',
        route: work_route_1.WorkRoute,
    },
    {
        path: '/team-members',
        route: teamMember_route_1.TeamMemberRoute,
    },
    {
        path: '/founders',
        route: founder_route_1.FounderRoute,
    },
    {
        path: '/email-records',
        route: emailRecord_route_1.EmailRecordRoute,
    },
    {
        path: '/visitors',
        route: visitor_route_1.VisitorRoute,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoute,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
