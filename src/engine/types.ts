import { z } from 'zod';

export const TradeSignalSchema = z.object({
  strategy: z.string(),
  symbol: z.enum(['BTC', 'ETH']),
  optionType: z.enum(['CALL', 'PUT']),
  direction: z.enum(['LONG', 'SHORT']),
  strike: z.number(),
  expiry: z.string(),
  size: z.number()
});
export type TradeSignal = z.infer<typeof TradeSignalSchema>;

export const OrderAckSchema = z.object({
  orderId: z.string(),
  status: z.enum(['ACCEPTED', 'REJECTED']),
  reason: z.string().optional()
});
export type OrderAck = z.infer<typeof OrderAckSchema>;
