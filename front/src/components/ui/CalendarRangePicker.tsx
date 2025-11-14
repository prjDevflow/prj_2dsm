import React from "react";
import Calendar from "./calendar"; // usa seu Calendar existente

type Range = { start?: Date | null; end?: Date | null };

type Props = {
  value?: Range;
  onChange?: (r: Range) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  showApply?: boolean; // se true, altera só no onApply
  onApply?: (r: Range) => void;
  className?: string;
  captionLayout?: "buttons" | "dropdown";
};

/**
 * CalendarRangePicker
 * - Mostra dois calendários (start / end) lado a lado.
 * - Respeita minDate/maxDate (bloqueia seleção fora).
 * - Quando showApply=true, mantém seleção local até onApply ser chamado.
 */
export default function CalendarRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  showApply = false,
  onApply,
  className = "",
  captionLayout = "buttons",
}: Props) {
  const [temp, setTemp] = React.useState<Range>({ start: value?.start ?? null, end: value?.end ?? null });

  React.useEffect(() => {
    // sync external value -> temp (unless user is editing)
    setTemp({ start: value?.start ?? null, end: value?.end ?? null });
  }, [value?.end, value?.start]);

  // clamp helper
  function clampDate(d?: Date | null) {
    if (!d) return null;
    if (minDate && d < minDate) return minDate;
    if (maxDate && d > maxDate) return maxDate;
    return d;
  }

  function setStart(d?: Date | null) {
    const s = clampDate(d ?? null);
    let e = temp.end ?? null;
    // se start > end, swap / ajustar
    if (s && e && s > e) e = s;
    const next = { start: s, end: e };
    if (showApply) {
      setTemp(next);
    } else {
      setTemp(next);
      onChange?.(next);
    }
  }

  function setEnd(d?: Date | null) {
    const e = clampDate(d ?? null);
    let s = temp.start ?? null;
    if (s && e && s > e) s = e;
    const next = { start: s, end: e };
    if (showApply) {
      setTemp(next);
    } else {
      setTemp(next);
      onChange?.(next);
    }
  }

  function handleApply() {
    // garante ordem correta
    let s = temp.start ?? null;
    let e = temp.end ?? null;
    if (s && e && s > e) [s, e] = [e, s];
    onApply?.({ start: s, end: e });
    onChange?.({ start: s, end: e });
  }

  return (
    <div className={["flex gap-4", className].join(" ")}>
      <div className="flex-1">
        <div className="text-xs font-medium mb-1">Início</div>
        <Calendar
          selected={temp.start ?? undefined}
          month={temp.start ? new Date(temp.start.getFullYear(), temp.start.getMonth(), 1) : undefined}
          captionLayout={captionLayout}
          onMonthChange={() => {}}
          onSelect={(d) => setStart(d)}
        />
      </div>

      <div className="flex-1">
        <div className="text-xs font-medium mb-1">Fim</div>
        <Calendar
          selected={temp.end ?? undefined}
          month={temp.end ? new Date(temp.end.getFullYear(), temp.end.getMonth(), 1) : undefined}
          captionLayout={captionLayout}
          onMonthChange={() => {}}
          onSelect={(d) => setEnd(d)}
        />
      </div>

      {/* área de controles quando showApply true */}
      {showApply && (
        <div className="flex flex-col gap-2 justify-between">
          <div className="text-xs text-gray-500">
            <div>Período permitido:</div>
            <div className="mt-1 text-sm">
              {minDate ? minDate.toLocaleDateString() : "—"} — {maxDate ? maxDate.toLocaleDateString() : "—"}
            </div>
          </div>

          <div className="flex flex-col">
            <button
              onClick={handleApply}
              className="px-3 py-2 bg-blue-600 text-white rounded mb-2"
            >
              Aplicar
            </button>
            <button
              onClick={() => {
                // reset para bounds
                const s = minDate ?? null;
                const e = maxDate ?? null;
                setTemp({ start: s, end: e });
              }}
              className="px-3 py-2 border rounded"
            >
              Reset período
            </button>
          </div>
        </div>
      )}
    </div>
  );
}