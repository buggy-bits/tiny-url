import { Router } from 'express';
import {
  createShortUrl,
  getDataByShortCode,
} from '../controllers/url.controller';
import { verifyToken } from '../middlewares/token.middleware';

const router = Router();
// the route /
router.use(verifyToken); // Protect all routes below this middleware

router.post('/', createShortUrl);
router.get('/:shortCode', getDataByShortCode);

export default router;
