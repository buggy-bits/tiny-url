import { Router } from 'express';
import {
  loginGuestUser,
  loginUser,
  registerUser,
} from '../controllers/auth.controller';
import { newAccessToken } from '../controllers/token.controller';

const router = Router();
// the route /api/v1/auth

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/iamguest', loginGuestUser);

router.get('/token/refresh', newAccessToken);
export default router;
