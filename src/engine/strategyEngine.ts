import { TradeSignal } from './types';

interface MarketState {
  rsi5: number;
  bbLower: number;
  bbUpper: number;
  price: number;
  ivRank: number;
  realizedVol: number;
  deltaDrift: number;
  timeToExpiryMin: number;
}

export class StrategyEngine {
  constructor(private config: { momentum: boolean; ironCondor: boolean; shortStraddle: boolean }) {}

  generate(state: MarketState): TradeSignal[] {
    const signals: TradeSignal[] = [];

    if (this.config.momentum) {
      // Momentum Long Option
      // if RSI < 30 and price touches lower BB => buy call
      if (state.rsi5 < 30 && state.price <= state.bbLower) {
        signals.push({ strategy: 'Momentum', symbol: 'BTC', optionType: 'CALL', direction: 'LONG', strike: state.price, expiry: '0DTE', size: 1 });
      }
      // mirror logic for puts
      if (state.rsi5 > 70 && state.price >= state.bbUpper) {
        signals.push({ strategy: 'Momentum', symbol: 'BTC', optionType: 'PUT', direction: 'LONG', strike: state.price, expiry: '0DTE', size: 1 });
      }
    }

    if (this.config.ironCondor) {
      /*
      Iron Condor
      - Short strikes ±5% ATM; long wings ±8%
      - IV Rank > 60% and realized vol low
      - Auto-close at 70% credit or T-20m
      */
      if (state.ivRank > 60 && state.realizedVol < 30) {
        signals.push({ strategy: 'IronCondor', symbol: 'BTC', optionType: 'CALL', direction: 'SHORT', strike: state.price * 1.05, expiry: '0DTE', size: 1 });
        signals.push({ strategy: 'IronCondor', symbol: 'BTC', optionType: 'PUT', direction: 'SHORT', strike: state.price * 0.95, expiry: '0DTE', size: 1 });
      }
    }

    if (this.config.shortStraddle) {
      /*
      Short ATM Straddle + Delta-Hedge
      - Enabled only when IV < 30%
      - Hedge underlying every ±100 USD delta drift
      */
      if (state.ivRank < 30) {
        signals.push({ strategy: 'ShortStraddle', symbol: 'BTC', optionType: 'CALL', direction: 'SHORT', strike: state.price, expiry: '0DTE', size: 1 });
        signals.push({ strategy: 'ShortStraddle', symbol: 'BTC', optionType: 'PUT', direction: 'SHORT', strike: state.price, expiry: '0DTE', size: 1 });
      }
    }

    return signals;
  }
}
