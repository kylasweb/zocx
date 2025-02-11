import { z } from 'zod';

export const PaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  paymentMethod: z.enum(['bank', 'crypto', 'ewallet']),
  account: z.string().min(5)
});

export const WithdrawalSchema = z.object({
  amount: z.number().positive(),
  walletType: z.enum(['deposit', 'referral', 'withdrawal'])
}); 