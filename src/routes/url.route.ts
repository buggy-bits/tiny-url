import { Router } from "express";
import {
  createShortUrl,
  getDataByShortCode,
} from "../controllers/url.controller";

const router = Router();
// the route /

router.post("/urls", createShortUrl);
router.get("/urls/:shortCode", getDataByShortCode);

export default router;
