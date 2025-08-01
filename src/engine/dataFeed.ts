import WebSocket, { RawData } from 'ws';
import { EventEmitter } from 'events';

export class DataFeed extends EventEmitter {
  private ws?: WebSocket;
  private retries = 0;
  private readonly maxRetries = 5;

  constructor(private url: string) {
    super();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.on('open', () => {
      this.retries = 0;
      this.emit('open');
    });
    this.ws.on('message', (msg: RawData) => this.emit('message', msg));
    this.ws.on('close', () => this.retry());
    this.ws.on('error', () => this.retry());
  }

  private retry() {
    if (this.retries >= this.maxRetries) {
      this.emit('error', new Error('max retries exceeded'));
      return;
    }
    const delay = Math.pow(2, this.retries) * 1000;
    setTimeout(() => this.connect(), delay);
    this.retries += 1;
  }
}
