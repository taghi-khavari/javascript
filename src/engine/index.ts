import { DataFeed } from './dataFeed';
import { IndicatorEngine } from './indicatorEngine';
import { StrategyEngine } from './strategyEngine';
import { RiskManager } from './riskManager';
import { ExecutionModule } from './executionModule';
import { JobQueue } from './jobQueue';
import { TradeSignal } from './types';

export class BotEngine {
  private dataFeed: DataFeed;
  private indicators = new IndicatorEngine();
  private strategies: StrategyEngine;
  private risk: RiskManager;
  private exec: ExecutionModule;
  private jobs: JobQueue;

  constructor(private cfg: any) {
    this.dataFeed = new DataFeed(cfg.deribitWs);
    this.strategies = new StrategyEngine(cfg.strategies);
    this.risk = new RiskManager(cfg.risk.maxTradeRiskPct, cfg.risk.dailyStopLossPct);
    this.exec = new ExecutionModule(cfg.deribitRest, cfg.auth);
    this.jobs = new JobQueue({ host: cfg.redis.host, port: cfg.redis.port });
  }

  start() {
    this.dataFeed.on('message', (msg) => this.onMarketData(msg));
    this.dataFeed.connect();
    this.jobs.scheduleHeartBeat();
  }

  private async onMarketData(_msg: any) {
    // parse market state and produce signals
    const state = { rsi5: 30, bbLower: 0, bbUpper: 0, price: 0, ivRank: 0, realizedVol: 0, deltaDrift: 0, timeToExpiryMin: 30 };
    const signals = this.strategies.generate(state);
    for (const signal of signals) {
      if (this.risk.validate(signal, 100000) && this.risk.canTrade()) {
        await this.exec.placeOrder(signal);
      }
    }
  }
}
