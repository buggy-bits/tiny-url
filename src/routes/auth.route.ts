import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import {
  IAuthenticatedRequest,
  verifyToken,
} from "../middlewares/token.middleware";

const router = Router();
// the route /

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get(
  "/auth/greetUser",
  verifyToken,
  (req: IAuthenticatedRequest, res) => {
    res.send("Hello, User!" + req.user?.userId);
  }
);
export default router;
