import express from 'express';
import { Withdrawal } from '../models/Withdrawal';
import { User } from '../models/User';
import { logAction } from '../middleware/auditLog';

const router = express.Router();

router.post('/request', async (req, res) => {
  try {
    const { userId, amount, walletType } = req.body;
    
    const user = await User.findById(userId);
    if (!user || user.wallets[walletType] < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.wallets[walletType] -= amount;
    await user.save();

    const withdrawal = new Withdrawal({
      user: userId,
      amount,
      walletType,
      status: 'pending',
      requestDate: new Date()
    });

    await withdrawal.save();
    await logAction({
      userId,
      actionType: 'withdrawal_requested',
      details: `Withdrawal of ${amount} from ${walletType} wallet`
    });

    res.json({ 
      success: true, 
      withdrawalId: withdrawal._id,
      newBalance: user.wallets[walletType]
    });

  } catch (error) {
    res.status(500).json({ error: 'Withdrawal request failed' });
  }
});

export default router; 