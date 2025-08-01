import { Queue } from 'bullmq';

export class JobQueue {
  heartbeat: Queue;
  constructor(connection: { host: string; port: number }) {
    this.heartbeat = new Queue('heartbeat', { connection });
  }

  async scheduleHeartBeat() {
    await this.heartbeat.add('beat', {}, { repeat: { every: 60_000 } });
  }
}
