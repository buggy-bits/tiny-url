import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { redirectToOriginalUrl } from './controllers/url.controller';
import cors from 'cors';

const app = express();
app.use(express.json());
// Routes
// cors configuration
app.use(
  cors({
    origin: '*', // Allow all origins for simplicity; adjust as needed for security
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.get('/:shortCode', redirectToOriginalUrl);
app.use('/api/v1/', routes);
app.get('/health/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working fine',
    hostname: req.hostname,
    host: req.host,
    protocol: req.protocol,
    hostAsperGpt: req.get('host'),
  });
});
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
