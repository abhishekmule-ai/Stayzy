import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import { initDatabase } from './config/database.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',')
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

// Request logger for development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Stayzy API Server',
    status: 'online',
    docs: '/api/v1/health',
  });
});

// Mount /api/v1
app.use('/api/v1', apiRouter);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Auto-start server when run directly
const isRunDirectly = process.argv[1] && (process.argv[1].endsWith('app.js') || process.argv[1].includes('server\\src\\app.js'));
if (isRunDirectly && process.env.NODE_ENV !== 'test') {
  initDatabase().finally(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Stayzy REST API listening on http://localhost:${PORT}/api/v1`);
    });
  });
}

export default app;
