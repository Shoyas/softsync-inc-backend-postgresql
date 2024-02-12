import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.roue';
import { BlogRoute } from '../modules/blog/blog.route';
import { FounderRoute } from '../modules/founder/founder.route';
import { TeamMemberRoute } from '../modules/teamMember/teamMember.route';
import { WorkRoute } from '../modules/work/work.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: BlogRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/works',
    route: WorkRoute,
  },
  {
    path: '/team-members',
    route: TeamMemberRoute,
  },
  {
    path: '/founders',
    route: FounderRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
