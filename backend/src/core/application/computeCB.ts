export const TARGET_INTENSITY = 89.3368;
export const MJ_PER_T = 41000;

export function computeCB(actualIntensity: number, fuelConsumptionT: number, target = TARGET_INTENSITY) {
  const energyMJ = fuelConsumptionT * MJ_PER_T;
  const cb = (target - actualIntensity) * energyMJ;
  return Math.round(cb * 1000) / 1000;
}
