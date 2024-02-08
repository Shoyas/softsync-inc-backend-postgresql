import express from 'express';
import { BlogRoute } from '../modules/blog/blog.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/blogs',
    route: BlogRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
