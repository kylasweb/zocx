import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { scheduleTasks } from './services/cronService';
import paymentRouter from './api/payment';
import withdrawalRouter from './api/withdrawal';
import commissionRouter from './api/commission';
import userRolesRouter from './api/userRoles';
import { securityHeaders } from './middleware/security';
import { apiLimiter } from './middleware/rateLimit';
import { swaggerMiddleware, swaggerHandler } from './api/docs';

// Database connection
mongoose.connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express
const app = express();
app.use(express.json());

// API Routes
app.use('/api/payments', paymentRouter);
app.use('/api/withdrawals', withdrawalRouter);
app.use('/api/commissions', commissionRouter);
app.use('/api/user-roles', userRolesRouter);

// Schedule background tasks
scheduleTasks();

// Add security middleware
app.use(securityHeaders);

// Add rate limiting
app.use('/api/', apiLimiter);

// Add API docs
app.use('/api-docs', swaggerMiddleware, swaggerHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 