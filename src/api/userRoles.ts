import express from 'express';
import { User } from '../models/User';
import { logAction } from '../middleware/auditLog';

const router = express.Router();

router.put('/:userId/role', async (req, res) => {
  try {
    const { userId } = req.params;
    const { newRole, adminId } = req.body;

    if (!['admin', 'manager', 'user'].includes(newRole)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await logAction({
      userId: adminId,
      actionType: 'role_changed',
      details: `Changed role for ${user.email} to ${newRole}`,
      entityType: 'User',
      entityId: userId
    });

    res.json({ 
      success: true,
      userId: user._id,
      newRole: user.role
    });

  } catch (error) {
    res.status(500).json({ error: 'Role update failed' });
  }
});

export default router; 