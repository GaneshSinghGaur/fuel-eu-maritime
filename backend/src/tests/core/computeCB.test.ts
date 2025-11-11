import { computeCB } from '../../core/application/computeCB';

test('computeCB basic', () => {
  const cb = computeCB(90, 1000);
  expect(typeof cb).toBe('number');
});
