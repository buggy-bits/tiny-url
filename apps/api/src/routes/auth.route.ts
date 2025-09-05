import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { newAccessToken } from '../controllers/token.controller';

const router = Router();
// the route /

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/token/refresh', newAccessToken);
export default router;
