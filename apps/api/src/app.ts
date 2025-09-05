import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { redirectToOriginalUrl } from './controllers/url.controller';

const app = express();
app.use(express.json());
// Routes
app.get('/:shortCode', redirectToOriginalUrl);
app.use('/api/v1/', routes);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
