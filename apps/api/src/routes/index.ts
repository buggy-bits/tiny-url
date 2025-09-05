import { Router } from 'express';
import authRoutes from './auth.route';
import urlRoutes from './url.route';

const router = Router();

router.use('/urls', urlRoutes);
router.use('/auth', authRoutes);

export default router;
