import { Router } from 'express';
import {
  createShortUrl,
  deleteShortUrl,
  getClickLogsByShortCode,
  getDataByShortCode,
  getUserUrls,
  updateUrlData,
} from '../controllers/url.controller';
import { verifyToken } from '../middlewares/token.middleware';

const router = Router();
//  /urls/
router.use(verifyToken); // Protect all routes below this middleware

router.get('/', getUserUrls);
router.post('/', createShortUrl);
router.get('/:shortCode', getDataByShortCode);
router.get('/:shortCode/logs', getClickLogsByShortCode);
router.delete('/:shortCode', deleteShortUrl);
router.put('/:shortCode', updateUrlData);

export default router;
