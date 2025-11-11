/**
 * Compute Compliance Balance (CB)
 *
 * CB = (target - actual) * (fuelConsumption_t * 41000)
 *
 * Returns in gCO2e (units consistent with spec)
 */
export const TARGET_INTENSITY = 89.3368; // gCO2e/MJ
export const MJ_PER_T = 41000;

export function computeCB(actualIntensity: number, fuelConsumptionT: number, target = TARGET_INTENSITY) {
  const energyMJ = fuelConsumptionT * MJ_PER_T;
  const cb = (target - actualIntensity) * energyMJ;
  // round to 3 decimals
  return Math.round(cb * 1000) / 1000;
}
