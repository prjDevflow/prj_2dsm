import React, { useEffect, useRef, useState } from "react";
import Calendar from "./ui/calendar";

type Range = { start?: Date | null; end?: Date | null };

type CalendarPickerProps = {
  value?: Range;
  onChange?: (range: Range) => void;
  showApply?: boolean;
  onApply?: (range: Range) => void;
  // Note: removi as props relacionadas a pontos/estação (points, selectedPointId, onSelectPoint)
};

function clampToStartOfDay(d?: Date | null) {
  if (!d) return undefined;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addMonths(d: Date | undefined | null, n: number) {
  if (!d) return undefined;
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  value,
  onChange,
  showApply = true,
  onApply,
}) => {
  const now = new Date();

  // datas locais
  const [start, setStart] = useState<Date | undefined | null>(clampToStartOfDay(value?.start));
  const [end, setEnd] = useState<Date | undefined | null>(clampToStartOfDay(value?.end));

  // meses mostrados em cada calendário (permitir navegação)
  const [startMonth, setStartMonth] = useState<Date>(
    start
      ? new Date(start.getFullYear(), start.getMonth(), 1)
      : new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [endMonth, setEndMonth] = useState<Date>(
    end
      ? new Date(end.getFullYear(), end.getMonth(), 1)
      : (addMonths(startMonth, 1) ?? new Date(now.getFullYear(), now.getMonth() + 1, 1)),
  );

  // controle de qual popover está aberto ('start' | 'end' | null)
  const [openField, setOpenField] = useState<"start" | "end" | null>(null);

  // refs para detectar clique fora
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // sync quando value mudar de fora
  useEffect(() => {
    if (value?.start) {
      const s = clampToStartOfDay(value.start);
      setStart(s);
      setStartMonth(new Date(s!.getFullYear(), s!.getMonth(), 1));
    }
    if (value?.end) {
      const e = clampToStartOfDay(value.end);
      setEnd(e);
      setEndMonth(new Date(e!.getFullYear(), e!.getMonth(), 1));
    }
  }, [value?.start, value?.end]);

  // fechar ao clicar fora de ambos popovers
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (openField === "start") {
        if (startRef.current && target && !startRef.current.contains(target)) setOpenField(null);
      } else if (openField === "end") {
        if (endRef.current && target && !endRef.current.contains(target)) setOpenField(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openField]);

  const formatDate = (d?: Date | null) => (d ? d.toLocaleDateString() : "");

  const handleSelectStart = (d: Date) => {
    const s = clampToStartOfDay(d);
    setStart(s);
    if (end && s && end.getTime() < s.getTime()) {
      setEnd(s);
      setEndMonth(new Date(s.getFullYear(), s.getMonth(), 1));
      onChange?.({ start: s, end: s });
    } else {
      onChange?.({ start: s, end });
    }
    setOpenField(null);
  };

  const handleSelectEnd = (d: Date) => {
    const e = clampToStartOfDay(d);
    if (start && e && e.getTime() < start.getTime()) {
      setStart(e);
      setStartMonth(new Date(e.getFullYear(), e.getMonth(), 1));
      setEnd(e);
      onChange?.({ start: e, end: e });
    } else {
      setEnd(e);
      onChange?.({ start, end: e });
    }
    setOpenField(null);
  };

  const handleClear = () => {
    setStart(undefined);
    setEnd(undefined);
    onChange?.({ start: undefined, end: undefined });
  };

  const handleApply = () => {
    onApply?.({ start, end });
  };

  const canApply = !!start && !!end;

  return (
    <div className="flex items-center gap-3">
      {/* NOTE: seletor de estação removido completamente */}

      {/* START input-like trigger */}
      <div ref={startRef} className="relative inline-block">
        <button
          type="button"
          onClick={() => {
            const sMonth = start
              ? new Date(start.getFullYear(), start.getMonth(), 1)
              : new Date(now.getFullYear(), now.getMonth(), 1);
            setStartMonth(sMonth);
            setEndMonth(
              (prev) =>
                prev ?? addMonths(sMonth, 1) ?? new Date(now.getFullYear(), now.getMonth() + 1, 1),
            );
            setOpenField((v) => (v === "start" ? null : "start"));
          }}
          className="flex items-center justify-between px-3 py-2 w-44 border rounded text-sm bg-white shadow-sm"
        >
          <div className="text-xs text-muted-foreground">Início</div>
          <div className="ml-2 text-sm">{formatDate(start) || "—"}</div>
        </button>

        {openField === "start" && (
          <div
            className="absolute left-0 mt-2 z-50 bg-white border rounded-md shadow-lg p-3"
            style={{ minWidth: 280, maxWidth: 360 }}
          >
            <div className="text-sm font-medium mb-2 text-center">Data início</div>
            <Calendar
              selected={start ?? undefined}
              month={startMonth}
              onMonthChange={(m) => setStartMonth(new Date(m.getFullYear(), m.getMonth(), 1))}
              onSelect={handleSelectStart}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setOpenField(null)}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* END input-like trigger */}
      <div ref={endRef} className="relative inline-block">
        <button
          type="button"
          onClick={() => {
            const eMonth = end
              ? new Date(end.getFullYear(), end.getMonth(), 1)
              : (addMonths(startMonth, 1) ?? new Date(now.getFullYear(), now.getMonth() + 1, 1));
            setEndMonth(eMonth);
            setStartMonth((prev) => prev ?? new Date(now.getFullYear(), now.getMonth(), 1));
            setOpenField((v) => (v === "end" ? null : "end"));
          }}
          className="flex items-center justify-between px-3 py-2 w-44 border rounded text-sm bg-white shadow-sm"
        >
          <div className="text-xs text-muted-foreground">Fim</div>
          <div className="ml-2 text-sm">{formatDate(end) || "—"}</div>
        </button>

        {openField === "end" && (
          <div
            className="absolute right-0 mt-2 z-50 bg-white border rounded-md shadow-lg p-3"
            style={{ minWidth: 280, maxWidth: 360 }}
          >
            <div className="text-sm font-medium mb-2 text-center">Data fim</div>
            <Calendar
              selected={end ?? undefined}
              month={endMonth}
              onMonthChange={(m) => setEndMonth(new Date(m.getFullYear(), m.getMonth(), 1))}
              onSelect={handleSelectEnd}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setOpenField(null)}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-50"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* limpar */}
      <button onClick={handleClear} className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
        Limpar
      </button>

      {/* aplicar */}
      {showApply && (
        <button
          onClick={handleApply}
          disabled={!canApply}
          className={[
            "px-3 py-2 rounded text-sm font-medium shadow-sm",
            canApply
              ? "bg-primary text-primary-foreground hover:opacity-95"
              : "opacity-50 cursor-not-allowed border",
          ].join(" ")}
        >
          Aplicar
        </button>
      )}
    </div>
  );
};

export default CalendarPicker;
