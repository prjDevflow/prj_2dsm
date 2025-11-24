import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const calcMinWidth = (nCols: number) => Math.max(900, nCols * 140);

export const isRecordArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && (v.length === 0 || typeof v[0] === "object");

export function renderValue(v: unknown): string {
  if (v === null || v === undefined) return "-";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

export function normalizePayload(payload: unknown): { online: Record<string, unknown>[]; offline: Record<string, unknown>[] } {
  const online: Record<string, unknown>[] = [];
  const offline: Record<string, unknown>[] = [];

  if (isRecordArray(payload)) {
    online.push(...payload);
    return { online, offline };
  }

  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    if (obj.data && typeof obj.data === "object") {
      const dataObj = obj.data as Record<string, unknown>;
      if (isRecordArray(dataObj.registers)) {
        online.push(...(dataObj.registers as Record<string, unknown>[]));
        return { online, offline };
      }
    }

    if (isRecordArray(obj.online) || isRecordArray(obj.offline)) {
      online.push(...((obj.online as Record<string, unknown>[]) ?? []));
      offline.push(...((obj.offline as Record<string, unknown>[]) ?? []));
      return { online, offline };
    }

    if (isRecordArray(obj.data)) {
      online.push(...(obj.data as Record<string, unknown>[]));
      return { online, offline };
    }

    if (isRecordArray(obj.sima) || isRecordArray(obj.sima_offline)) {
      online.push(...((obj.sima as Record<string, unknown>[]) ?? []));
      offline.push(...((obj.sima_offline as Record<string, unknown>[]) ?? []));
      return { online, offline };
    }

    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (isRecordArray(v)) {
        const sample = (v as Record<string, unknown>[])[0];
        if (sample && typeof sample === "object" && "idsimaoffline" in sample) {
          offline.push(...(v as Record<string, unknown>[]));
        } else {
          online.push(...(v as Record<string, unknown>[]));
        }
      }
    }
    return { online, offline };
  }

  return { online, offline };
}

export function extractTotals(payload: unknown): {
  total?: number;
  totalOnline?: number;
  totalOffline?: number;
} {
  if (!payload || typeof payload !== "object") return {};
  const obj: any = payload;

  const pickNumber = (v: unknown) => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const candidates = [
    obj.total,
    obj.count,
    obj.total_count,
    obj.totalItems,
    obj.totalItemsCount,
    obj.meta?.total,
    obj.pagination?.total,
    obj.data?.total,
    obj.data?.pagination?.total,
    obj.data?.meta?.total,
  ];

  const total = candidates.map(pickNumber).find((v) => v !== undefined);

  const totalOnline = pickNumber(obj.online_total ?? obj.total_online ?? obj.onlineTotal ?? obj.meta?.online_total ?? obj.data?.online_total);
  const totalOffline = pickNumber(obj.offline_total ?? obj.total_offline ?? obj.offlineTotal ?? obj.meta?.offline_total ?? obj.data?.offline_total);

  const fallbackOnline = pickNumber(obj.data?.counts?.online ?? obj.data?.counts?.sima ?? obj.data?.counts?.total_online);
  const fallbackOffline = pickNumber(obj.data?.counts?.offline ?? obj.data?.counts?.sima_offline ?? obj.data?.counts?.total_offline);

  return {
    total: total ?? pickNumber(obj.data?.registers_total) ?? undefined,
    totalOnline: totalOnline ?? fallbackOnline ?? undefined,
    totalOffline: totalOffline ?? fallbackOffline ?? undefined,
  };
}