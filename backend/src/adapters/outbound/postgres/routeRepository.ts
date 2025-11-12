import { RouteRepo } from '../../../core/ports/route_repo';
import { Route } from '../../../core/domain/route';
import { prisma } from './prismaClient';

export class PrismaRouteRepo implements RouteRepo {
  async listRoutes(filter?: { vesselType?: string; fuelType?: string; year?: number;}) {
    const where: any = {};
    if (filter?.vesselType) where.vesselType = filter.vesselType;
    if (filter?.fuelType) where.fuelType = filter.fuelType;
    if (filter?.year) where.year = filter.year;
    const rows = await prisma.route.findMany({ where, orderBy: { id: 'asc' }});
    return rows.map(r => ({
      id: r.id,
      routeId: r.routeId,
      vesselType: r.vesselType,
      fuelType: r.fuelType,
      year: r.year,
      ghgIntensity: r.ghgIntensity,
      fuelConsumption: r.fuelConsumption,
      distance: r.distance ?? 0,
      totalEmissions: r.totalEmissions ?? 0,
      isBaseline: r.isBaseline
    }));
  }

  async findById(id: number) {
    const r = await prisma.route.findUnique({ where: { id }});
    if (!r) return null;
    return { ...r } as Route;
  }

  async findByRouteId(routeId: string) {
    const r = await prisma.route.findUnique({ where: { routeId }});
    if (!r) return null;
    return { ...r } as Route;
  }

  async setBaseline(routeId: string) {
    await prisma.route.updateMany({ where: {}, data: { isBaseline: false }});
    await prisma.route.update({ where: { routeId }, data: { isBaseline: true }});
  }
  async createRoute(data: Omit<Route, 'id'>) {
    const r = await prisma.route.create({ data: {
      routeId: data.routeId,
      vesselType: data.vesselType,
      fuelType: data.fuelType,
      year: data.year,
      ghgIntensity: data.ghgIntensity,
      fuelConsumption: data.fuelConsumption,
      distance: data.distance ?? null,
      totalEmissions: data.totalEmissions ?? null,
      isBaseline: data.isBaseline ?? false
    }});
    return r;
  }

  async updateByRouteId(routeId: string, patch: Partial<Route>) {
    const r = await prisma.route.update({
      where: { routeId },
      data: {
        vesselType: patch.vesselType,
        fuelType: patch.fuelType,
        year: patch.year,
        ghgIntensity: patch.ghgIntensity,
        fuelConsumption: patch.fuelConsumption,
        distance: (patch.distance === undefined) ? undefined : patch.distance,
        totalEmissions: (patch.totalEmissions === undefined) ? undefined : patch.totalEmissions,
        isBaseline: patch.isBaseline
      }
    });
    return r;
  }

  async deleteByRouteId(routeId: string) {
    await prisma.route.delete({ where: { routeId }});
  }
}
