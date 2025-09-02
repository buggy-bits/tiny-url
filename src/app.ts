import express from "express";
import testRoute from "./routes/test.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
app.use(express.json());
// Routes
app.use("/", testRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
