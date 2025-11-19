import { MonthYearPicker } from "./calendarGraphic";
import { ChartLineMultiple } from "./view";

export const GraphicsPage = () => {
  return (
    <main className="px-[14vw] h-full py-[3vh] flex flex-col gap-4 items-left">
      {/* <h1 className="text-xl font-semibold">Gráficos do Sima</h1> */}
      <section className="w-4/4">
        {/* <ChartLineMultiple /> */}

        <MonthYearPicker />
      </section>
    </main>
  );
};
