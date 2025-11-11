export interface ComplianceRepo {
  saveCB(shipId: string, year: number, cb: number): Promise<void>;
  getCB(shipId: string, year: number): Promise<number | null>;
  listBankEntries(shipId?: string, year?: number): Promise<{ shipId: string; year: number; amount_gco2eq: number }[]>;
  addBankEntry(shipId: string, year: number, amount: number): Promise<void>;
  applyBank(shipId: string, year: number, amount: number): Promise<void>;
}
