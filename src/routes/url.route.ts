import { Router } from "express";
import {
  createShortUrl,
  getDataByShortCode,
  redirectToOriginalUrl,
} from "../controllers/url.controller";

const router = Router();
// the route /

router.get("/:shortCode", redirectToOriginalUrl);
router.post("/urls", createShortUrl);
router.get("/urls/:shortCode", getDataByShortCode);

export default router;
