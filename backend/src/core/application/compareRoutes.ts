export function percentDiff(comparison: number, baseline: number) {
  if (baseline === 0) return 0;
  return ((comparison / baseline) - 1) * 100;
}
