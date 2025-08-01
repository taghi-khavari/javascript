import { TradeSignal } from './types';

export class RiskManager {
  private dailyLoss = 0;
  private pausedUntil?: Date;

  constructor(private maxTradeRiskPct: number, private dailyStopLossPct: number) {}

  canTrade(now: Date = new Date()): boolean {
    if (this.pausedUntil && now < this.pausedUntil) return false;
    return true;
  }

  recordLoss(pct: number, now: Date = new Date()): void {
    this.dailyLoss += pct;
    if (this.dailyLoss <= -this.dailyStopLossPct) {
      // pause until next UTC day
      const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      this.pausedUntil = tomorrow;
    }
  }

  validate(signal: TradeSignal, equity: number): boolean {
    const risk = (signal.size * signal.strike) / equity * 100;
    return risk <= this.maxTradeRiskPct;
  }
}
