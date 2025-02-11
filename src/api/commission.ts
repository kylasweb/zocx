import express from 'express';
import { calculateCommission } from '../services/commissionService';
import { logAction } from '../middleware/auditLog';

const router = express.Router();

router.get('/calculate', async (req, res) => {
  try {
    const { userId, amount, level } = req.query;
    
    const numericAmount = parseFloat(amount as string);
    const numericLevel = parseInt(level as string);
    
    if (isNaN(numericAmount) || isNaN(numericLevel)) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const commission = calculateCommission(numericAmount, numericLevel);
    
    await logAction({
      userId: userId as string,
      actionType: 'commission_calculated',
      details: `Commission for $${numericAmount} at level ${numericLevel}: $${commission}`
    });

    res.json({
      amount: numericAmount,
      level: numericLevel,
      commission,
      currency: 'USD'
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Commission calculation failed' });
  }
});

export default router; 