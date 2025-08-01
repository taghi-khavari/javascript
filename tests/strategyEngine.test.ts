import { StrategyEngine } from '../src/engine/strategyEngine';

test('Momentum strategy emits signal', () => {
  const engine = new StrategyEngine({ momentum: true, ironCondor: false, shortStraddle: false });
  const signals = engine.generate({
    rsi5: 20,
    bbLower: 100,
    bbUpper: 110,
    price: 100,
    ivRank: 0,
    realizedVol: 0,
    deltaDrift: 0,
    timeToExpiryMin: 30
  });
  expect(signals.length).toBe(1);
});
