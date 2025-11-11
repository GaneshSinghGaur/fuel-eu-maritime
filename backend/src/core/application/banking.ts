export type BankRecord = { shipId: string; year: number; amount: number };

export function canBank(cb: number) {
  return cb > 0;
}
