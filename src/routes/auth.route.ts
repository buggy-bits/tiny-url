import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();
// the route /

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

export default router;
