export type Route = {
  id?: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number; // t
  distance?: number;
  totalEmissions?: number;
  isBaseline?: boolean;
};
