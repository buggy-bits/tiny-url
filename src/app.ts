import express from "express";
import urlRoute from "./routes/url.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
app.use(express.json());
// Routes
app.use("/api/v1/", urlRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
