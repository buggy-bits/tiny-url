import { Router } from "express";
import { greetByName, greetUser } from "../controllers/test.controller";

const router = Router();
// the route /
router.get("/", greetUser);
router.post("/sayHiTo", greetByName);

export default router;
