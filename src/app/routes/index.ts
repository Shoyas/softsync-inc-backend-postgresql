import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { BlogRoute } from '../modules/blog/blog.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/blogs',
    route: BlogRoute,
  },
  {
    path: '/admin-auth',
    route: AdminRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
