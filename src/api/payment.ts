import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../models/Payment';
import { logAction } from '../middleware/auditLog';

const router = express.Router();

router.post('/process', async (req, res) => {
  try {
    const { userId, amount, currency, paymentMethod, account } = req.body;
    
    if (!userId || !amount || !paymentMethod || !account) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const payment = new Payment({
      transactionId: uuidv4(),
      userId,
      amount,
      currency: currency || 'USD',
      paymentMethod,
      account,
      status: 'pending',
      timestamp: new Date()
    });

    await payment.save();
    await logAction({
      userId,
      actionType: 'payment_initiated',
      details: `Payment of ${amount} ${currency} via ${paymentMethod}`
    });

    // Simulate async payment processing
    setTimeout(async () => {
      payment.status = 'completed';
      await payment.save();
      await logAction({
        userId,
        actionType: 'payment_completed',
        details: `Payment ${payment.transactionId} completed`
      });
    }, 5000);

    res.json({ 
      success: true,
      transactionId: payment.transactionId,
      status: payment.status
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

export default router; 