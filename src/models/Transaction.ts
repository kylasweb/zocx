import mongoose from 'mongoose';

interface TransactionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

const transactionSchema = new mongoose.Schema<TransactionDocument>({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  type: { 
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model<TransactionDocument>('Transaction', transactionSchema); 