export type Member = { shipId: string; cb_before: number; cb_after?: number };

export function greedyPoolAllocation(members: Member[]): Member[] {
  const total = members.reduce((s, m) => s + m.cb_before, 0);
  if (Math.round(total * 1000) / 1000 < 0) {
    throw new Error('Pool invalid: total CB < 0');
  }
  const sorted = members.map(m => ({ ...m })).sort((a, b) => b.cb_before - a.cb_before);
  const deficits = sorted.filter(m => m.cb_before < 0).sort((a, b) => a.cb_before - b.cb_before);
  const surplus = sorted.filter(m => m.cb_before > 0);
  for (const s of surplus) {
    let available = s.cb_before;
    for (const d of deficits) {
      if (d.cb_before >= 0) continue;
      const needed = -d.cb_before;
      const transfer = Math.min(available, needed);
      d.cb_before += transfer;
      available -= transfer;
      if (available <= 0) break;
    }
    s.cb_before = available;
  }
  return [...sorted.filter(m => m.cb_before >= 0), ...sorted.filter(m => m.cb_before < 0)].map(m => ({ shipId: m.shipId, cb_before: m.cb_before, cb_after: m.cb_before }));
}
