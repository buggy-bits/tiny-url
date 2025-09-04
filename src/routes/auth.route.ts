import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { newAccessToken } from "../controllers/token.controller";

const router = Router();
// the route /

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/token/refresh", newAccessToken);
export default router;
