import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";

// import * as React from "react";
// import { type DateRange } from "react-day-picker";
// import { Calendar } from "@/components/ui/calendar";

// CONFIG DINÂMICO PARA SHADCN
const chartConfig = {
  value1: {
    label: "Valor principal",
    color: "#5675ff",
  },
  value2: {
    label: "Valor secundário",
    color: "#ffa723",
  },
} satisfies ChartConfig;

export function ChartLineMultiple() {
  const [station, setStation] = useState<string | null>(null);
  const [dataType, setDataType] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  //   from: new Date(2025, 5, 12),
  //   to: new Date(2025, 6, 15),
  // });

  useEffect(() => {
    if (!station || !dataType) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const query = new URLSearchParams({
          rotulo: station,
          type: dataType,
        }).toString();

        const res = await axios.get(`http://localhost:3001/graphics?${query}`);

        // Ajustar formato para o gráfico
        const parsed = res.data.data.registers.map((item: any) => ({
          timestamp: item.timestamp,
          value1: item.value1,
          value2: item.value2 ?? null,
        }));

        setChartData(parsed);
      } catch (err) {
        console.error("Erro ao buscar dados", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [station, dataType]);

  return (
    <Card className="h-full py-4 flex flex-col gap-0 !pb-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
          <CardTitle>Gráfico - SIMA</CardTitle>
          <CardDescription>Selecione uma estação e o tipo de dado que deseja obter</CardDescription>
        </div>

        <div className="flex gap-4 px-6 py-4">
          {/* SELECT ESTACAO */}
          {/* <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm"
          /> */}

          {/* SELECT ESTACAO */}
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
              <SelectItem value="Mamira">Mamira</SelectItem>
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

          {/* SELECT TIPO DE DADO — com tipos corretos das procedures */}
          <Select onValueChange={setDataType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de dado" />
            </SelectTrigger>
            <SelectContent className="max-h-100">
              <SelectItem value="carbono">Carbono</SelectItem>
              <SelectItem value="temperatura_2m">Temperatura 2m</SelectItem>
              <SelectItem value="temperatura_5m">Temperatura 5m</SelectItem>
              <SelectItem value="temperatura_20m">Temperatura 20m</SelectItem>
              <SelectItem value="temperatura_40m">Temperatura 40m</SelectItem>
              <SelectItem value="temperatura_ar">Temperatura do ar</SelectItem>
              <SelectItem value="temperatura_sonda">Temperatura (sonda)</SelectItem>
              <SelectItem value="oxigenio_dissolvido">Oxigênio dissolvido</SelectItem>
              <SelectItem value="ph">pH</SelectItem>
              <SelectItem value="clorofila">Clorofila</SelectItem>
              <SelectItem value="nutrientes_amonia">Nutrientes Amônia</SelectItem>
              <SelectItem value="nutrientes_do2">Nutrientes Dióxido de Nitrogénio</SelectItem>
              <SelectItem value="condutividade">Condutividade</SelectItem>
              <SelectItem value="turbidez">Turbidez</SelectItem>
              <SelectItem value="radiacao_incidencia">Radiação - Incidência</SelectItem>
              <SelectItem value="radiacao_reflexao">Radiação - Reflexão</SelectItem>
              <SelectItem value="vento">Vento</SelectItem>
              <SelectItem value="correntes_norte">Correntes Norte</SelectItem>
              <SelectItem value="correntes_leste">Correntes Leste</SelectItem>
              <SelectItem value="precipitacao">Precipitação</SelectItem>
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
          <div className="flex justify-center items-center h-[500px] text-zinc-500">
            <p>Selecione uma estação e um tipo de dado</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[500px] w-full">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="value1"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }
                  />
                }
              />

              {/* Linha principal */}
              <Line
                dataKey="value1"
                type="monotone"
                stroke="var(--color-value1)"
                strokeWidth={2}
                dot={false}
              />

              {/* Linha secundária, se existir */}
              {chartData.some((d) => d.value2 !== null) && (
                <Line
                  dataKey="value2"
                  type="monotone"
                  stroke="var(--color-value2)"
                  strokeWidth={2}
                  dot={false}
                />
              )}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}