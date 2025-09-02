import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller";

const router = Router();
// the route /

router.get("/urls/:shortUrls", createShortUrl);
router.post("/urls", createShortUrl);

export default router;
