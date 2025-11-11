import { Route } from "../domain/route";

export interface RouteRepo {
  listRoutes(filter?: { vesselType?: string; fuelType?: string; year?: number }): Promise<Route[]>;
  findById(id: number): Promise<Route | null>;
  findByRouteId(routeId: string): Promise<Route | null>;
  setBaseline(routeId: string): Promise<void>;
}
