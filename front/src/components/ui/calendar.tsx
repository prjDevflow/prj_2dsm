// src/components/ui/calendar.tsx
import React from "react";

type CalendarProps = {
  selected?: Date | undefined;
  month?: Date | undefined; // se provido, o calendário mostra esse mês (controlado pelo pai)
  captionLayout?: "dropdown" | "buttons";
  onMonthChange?: (d: Date) => void; // chamado quando usuário avança/volta mês
  onSelect?: (d: Date) => void;
  className?: string;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function isSameDay(a?: Date, b?: Date) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  month,
  captionLayout = "buttons",
  onMonthChange,
  onSelect,
  className = "max-w-[320px] w-full",
}) => {
  const now = new Date();
  const currentMonth = month ?? startOfMonth(now);
  const firstDay = startOfMonth(currentMonth).getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = endOfMonth(currentMonth).getDate();

  // build array of dates to render (including leading empty days)
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));

  const handlePrev = () => onMonthChange?.(addMonths(currentMonth, -1));
  const handleNext = () => onMonthChange?.(addMonths(currentMonth, 1));

  const monthLabel = currentMonth.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className={["p-3", className].join(" ")}>
      <div className="flex items-center justify-between mb-2">
        {captionLayout === "buttons" ? (
          <>
            <button type="button" onClick={handlePrev} className="p-1 rounded hover:bg-gray-100">
              ‹
            </button>
            <div className="text-sm font-medium">{monthLabel}</div>
            <button type="button" onClick={handleNext} className="p-1 rounded hover:bg-gray-100">
              ›
            </button>
          </>
        ) : (
          <>
            <div className="text-sm font-medium">{monthLabel}</div>
            <div className="flex gap-1">
              <button onClick={handlePrev} className="p-1 rounded hover:bg-gray-100">
                ‹
              </button>
              <button onClick={handleNext} className="p-1 rounded hover:bg-gray-100">
                ›
              </button>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="opacity-60 text-[11px]">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) =>
          cell ? (
            <button
              key={idx}
              onClick={() => onSelect?.(cell)}
              type="button"
              className={[
                "py-2 h-8 flex items-center justify-center rounded text-sm",
                isSameDay(cell, selected)
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-gray-100",
                isSameDay(cell, new Date()) ? "ring-1 ring-ring" : "",
              ].join(" ")}
            >
              {cell.getDate()}
            </button>
          ) : (
            <div key={idx} className="py-2 h-8" />
          ),
        )}
      </div>
    </div>
  );
};

export default Calendar;
