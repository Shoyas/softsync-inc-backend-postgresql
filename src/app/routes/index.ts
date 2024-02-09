import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.roue';
import { BlogRoute } from '../modules/blog/blog.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
