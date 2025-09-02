import { Router } from "express";
import { greetByName } from "../controllers/url.controller";
import { createShortUrl } from "../controllers/url.controller";

const router = Router();
// the route /

router.get("/urls/:shortUrls", greetByName);
router.post("/urls", createShortUrl);

export default router;
