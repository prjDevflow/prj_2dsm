import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useColetas } from "../hooks/useColetas"; // seu hook
import type { PontoColeta } from "../types/ponto";

type Props = {
  onMarkerClick?: (p: PontoColeta) => void;
  filters?: { points: (string | number)[] };
};

export default function Map({ onMarkerClick, filters }: Props) {
  const position: LatLngExpression = [-4.4067, -64.6002];
  const [type] = useState<"sima" | "balcar" | "furnas">("sima");

  const { data, isLoading, isError } = useColetas(type);

  if (isLoading) return <div>Carregando mapa...</div>;
  if (isError) return <div>Erro ao carregar coordenadas.</div>;

  // normalizar conjunto de filtros para comparação rápida (strings)
  const filterSet = new Set((filters?.points ?? []).map((x) => String(x)));

  // filtrar dados: se não há filtros, mostra tudo; senão apenas os ids presentes
  const visibleData = (data ?? []).filter((ponto: any) => {
    if (!filters?.points || filters.points.length === 0) return true;
    const id = String(ponto.id ?? ponto._id ?? ponto.nome ?? ponto.rotulo ?? ponto.name);
    return filterSet.has(id);
  });

  return (
    <div>
      <MapContainer
        center={position}
        zoom={6}
        className="map-container"
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={14}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri"
        />

        {visibleData.map(
          (ponto: {
            id: number | string;
            latitude: number;
            longitude: number;
            rotulo?: string;
          }) => (
            <Marker
              key={String(ponto.id)}
              position={[ponto.latitude, ponto.longitude] as LatLngExpression}
              eventHandlers={{
                click: () => {
                  onMarkerClick?.({
                    id: ponto.rotulo ?? ponto.id,
                    latitude: ponto.latitude,
                    longitude: ponto.longitude,
                    rotulo: ponto.rotulo,
                  } as PontoColeta);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                <strong>{ponto.rotulo ?? `ID ${ponto.id}`}</strong>
                <br />
                ID: {ponto.id}
              </Tooltip>
            </Marker>
          ),
        )}
      </MapContainer>

      {(!visibleData || visibleData.length === 0) && (
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            zIndex: 1300,
            background: "rgba(255,255,255,0.95)",
            padding: 8,
            borderRadius: 6,
          }}
        >
          Nenhum ponto selecionado para exibir.
        </div>
      )}
    </div>
  );
}
