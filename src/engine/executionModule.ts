import { TradeSignal, OrderAck } from './types';

export class ExecutionModule {
  constructor(private baseUrl: string, private auth: { key: string; secret: string }) {}

  async placeOrder(signal: TradeSignal): Promise<OrderAck> {
    for (let i = 0; i < 3; i++) {
      try {
        // placeholder for Deribit REST call
        const res = await fetch(`${this.baseUrl}/private/buy`, { method: 'POST' });
        if (!res.ok) throw new Error('order failed');
        return { orderId: '1', status: 'ACCEPTED' };
      } catch (err) {
        if (i === 2) throw err;
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
    return { orderId: '0', status: 'REJECTED', reason: 'unknown' };
  }
}
