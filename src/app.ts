import express from "express";
import urlRoute from "./routes/url.route";
import authRoute from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { redirectToOriginalUrl } from "./controllers/url.controller";

const app = express();
app.use(express.json());
// Routes
app.get("/:shortCode", redirectToOriginalUrl);
app.use("/api/v1/", urlRoute);
app.use("/api/v1/", authRoute);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
