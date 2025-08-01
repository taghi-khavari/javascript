import { RiskManager } from '../src/engine/riskManager';
import { TradeSignal } from '../src/engine/types';

test('RiskManager validates trade size', () => {
  const rm = new RiskManager(1, 4);
  const sig: TradeSignal = { strategy: 'test', symbol: 'BTC', optionType: 'CALL', direction: 'LONG', strike: 1000, expiry: '0DTE', size: 0.5 };
  expect(rm.validate(sig, 100000)).toBeTruthy();
});
