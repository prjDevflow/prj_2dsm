import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  //   SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export const description = "A multiple line chart";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#5675ffff",
  },
  mobile: {
    label: "Mobile",
    color: "#ffa723ff",
  },
} satisfies ChartConfig;

export function ChartLineMultiple() {
  const [station, setStation] = useState<string | null>(null);
  const [dataType, setDataType] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ date: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!station || !dataType) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          rotulo: station,
          type: dataType,
        }).toString();

        const res = await fetch(`https://prj-2dsm.onrender.com/graphics?${query}`);
        // if (!res.ok) throw new Error("Erro ao buscar dados");

        const data = await res.json();

        console.log(data);

        // Ajuste os dados conforme o formato da API
        // const parsed = data.map((item: any) => ({
        //   date: item.date,
        //   value: item.value,
        // }));

        setChartData(data);
      } catch (err) {
        console.error("Erro ao buscar dados", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [station, dataType]);

  return (
    <Card className="py-4 flex flex-col gap-0 !pb-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
          <CardTitle>Gráfico - SIMA</CardTitle>
          <CardDescription>Selecione uma estação e o tipo de dado que deseja obter</CardDescription>
        </div>
        <div className="flex gap-4 px-6 py-4">
          <Select onValueChange={setStation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estação" />
            </SelectTrigger>
            <SelectContent className="w-[180px] max-h-100">
              <SelectItem value="Balbina">Balbina</SelectItem>
              <SelectItem value="Ibitinga 1">Ibitinga 1</SelectItem>
              <SelectItem value="Ibitinga 2">Ibitinga 2</SelectItem>
              <SelectItem value="Ibitinga 3">Ibitinga 3</SelectItem>
              <SelectItem value="Itumbiara 1">Itumbiara 1</SelectItem>
              <SelectItem value="Itumbiara 2">Itumbiara 2</SelectItem>
              <SelectItem value="Itumbiara 3">Itumbiara 3</SelectItem>
              <SelectItem value="Funil 1">Funil 1</SelectItem>
              <SelectItem value="Funil 2">Funil 2</SelectItem>
              <SelectItem value="Funil 3">Funil 3</SelectItem>
              <SelectItem value="Antar">Antar</SelectItem>
              <SelectItem value="Itaipu">Itaipu</SelectItem>
              <SelectItem value="Tucuruí 1">Tucuruí 1</SelectItem>
              <SelectItem value="Tucuruí 2">Tucuruí 2</SelectItem>
              <SelectItem value="Tucuruí 3">Tucuruí 3</SelectItem>
              <SelectItem value="Xingó">Xingó</SelectItem>
              <SelectItem value="Segredo">Segredo</SelectItem>
              <SelectItem value="Três Marias">Três Marias</SelectItem>
              <SelectItem value="Mamirauá">Mamira</SelectItem>
              <SelectItem value="Furnas - Embrapa">Furnas - Embrapa</SelectItem>
              <SelectItem value="Furnas 1">Furnas 1</SelectItem>
              <SelectItem value="Curuai">Curuai</SelectItem>
              <SelectItem value="Serra da Mesa 1">Serra da Mesa 1</SelectItem>
              <SelectItem value="Serra da Mesa 2">Serra da Mesa 2</SelectItem>
              <SelectItem value="Manso 1">Manso 1</SelectItem>
              <SelectItem value="Manso 2">Manso 2</SelectItem>
              <SelectItem value="Corumbá">Corumbá</SelectItem>
              <SelectItem value="Estreito">Estreito</SelectItem>
              <SelectItem value="Mascarenhas de Moraes">Mascarenhas de Moraes</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setDataType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de dado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carbono">Carbono</SelectItem>
              <SelectItem value="temperatura">Temperatura</SelectItem>
              <SelectItem value="oxigênio Dissolvido">Oxigênio Dissolvido</SelectItem>
              <SelectItem value="ph">PH</SelectItem>
              <SelectItem value="clorofila">Clorofila</SelectItem>
              <SelectItem value="nutrientes">Nutrientes</SelectItem>
              <SelectItem value="Condutividade">Condutividade</SelectItem>
              <SelectItem value="Turbidez">Turbidez</SelectItem>
              <SelectItem value="Radiação">Radiação</SelectItem>
              <SelectItem value="Vento">Vento</SelectItem>
              <SelectItem value="Correntes">Correntes</SelectItem>
              <SelectItem value="Precipitação">Precipitação</SelectItem>
              <SelectItem value="Qualidade da Água">Qualidade da Água</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6 relative">
        {loading && (
          <section className="absolute z-10 bg-zinc-900/80 text-zinc-100 flex justify-center items-center h-full w-full top-0 left-0">
            <h1 className="text-xl">Carregando dados...</h1>
          </section>
        )}

        {!station || !dataType ? (
          <div className="flex justify-center items-center h-[400px] text-zinc-500">
            <p>Selecione uma estação e um tipo de dado</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  />
                }
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
