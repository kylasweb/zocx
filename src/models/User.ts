import mongoose from 'mongoose';

interface UserWallets {
  deposit: number;
  referral: number;
  withdrawal: number;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  wallets: UserWallets;
  referralCode: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  },
  wallets: {
    deposit: { type: Number, default: 0 },
    referral: { type: Number, default: 0 },
    withdrawal: { type: Number, default: 0 }
  },
  referralCode: String,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<UserDocument>('User', userSchema); 