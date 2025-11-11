import { prisma } from './prismaClient';
import { ComplianceRepo } from '../../../core/ports/compliance_repo';

export class PrismaComplianceRepo implements ComplianceRepo {
  async saveCB(shipId: string, year: number, cb: number) {
    await prisma.shipCompliance.create({ data: { shipId, year, cb_gco2eq: cb }});
  }
  async getCB(shipId: string, year: number) {
    const row = await prisma.shipCompliance.findFirst({ where: { shipId, year }, orderBy: { createdAt: 'desc' }});
    return row ? row.cb_gco2eq : null;
  }
  async listBankEntries(shipId?: string, year?: number) {
    const where: any = {};
    if (shipId) where.shipId = shipId;
    if (year) where.year = year;
    const rows = await prisma.bankEntry.findMany({ where });
    return rows.map(r => ({ shipId: r.shipId, year: r.year, amount_gco2eq: r.amount_gco2eq }));
  }
  async addBankEntry(shipId: string, year: number, amount: number) {
    await prisma.bankEntry.create({ data: { shipId, year, amount_gco2eq: amount }});
  }
  async applyBank(shipId: string, year: number, amount: number) {
    // store negative bank entry to indicate usage
    await prisma.bankEntry.create({ data: { shipId, year, amount_gco2eq: -Math.abs(amount) }});
  }
}
