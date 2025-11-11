export function percentDiff(comparison: number, baseline: number) {
  // percentDiff = ((comparison / baseline) − 1) × 100
  if (baseline === 0) return 0;
  return ((comparison / baseline) - 1) * 100;
}
