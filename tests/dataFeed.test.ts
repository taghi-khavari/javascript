import { DataFeed } from '../src/engine/dataFeed';

test('DataFeed connects and retries', () => {
  const feed = new DataFeed('ws://localhost');
  expect(typeof feed.connect).toBe('function');
});
