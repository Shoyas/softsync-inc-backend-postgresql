import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogRoute } from '../modules/blog/blog.route';
import { CategoryRoute } from '../modules/category/category.route';
import { EmailRecordRoute } from '../modules/emailRecord/emailRecord.route';
import { FounderRoute } from '../modules/founder/founder.route';
import { ServiceRoute } from '../modules/service/service.route';
import { TeamMemberRoute } from '../modules/teamMember/teamMember.route';
import { VisitorRoute } from '../modules/visitor/visitor.route';
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
  {
    path: '/email-records',
    route: EmailRecordRoute,
  },
  {
    path: '/visitors',
    route: VisitorRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
