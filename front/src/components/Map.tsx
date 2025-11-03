import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useColetas } from "../hooks/useColetas";
import type { PontoColeta } from "../types/ponto";

type Props = {
  onMarkerClick?: (p: PontoColeta) => void;
  filters?: { points: (string | number)[] };
  type: "sima" | "balcar" | "furnas";
  instituicao?: string;
};

export default function Map({ onMarkerClick, filters, type, instituicao }: Props) {
  const position: LatLngExpression = [-15.7797, -57.9297];

  const { data, isLoading, isError } = useColetas(type, instituicao);

  if (isLoading) return <div>Carregando mapa...</div>;
  if (isError) return <div>Erro ao carregar coordenadas.</div>;

  // filtra pontos, se houver filtro
  const filterSet = new Set((filters?.points ?? []).map((x) => String(x)));
  const visibleData = (data ?? []).filter((ponto: any) => {
    if (!filters?.points || filters.points.length === 0) return true;
    const id = String(ponto.id ?? ponto._id ?? ponto.rotulo ?? ponto.nome ??ponto.instituicao + ponto.reservatorio);
    return filterSet.has(id);
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={14}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri"
        />

        {visibleData.map((ponto: any, index: number) => (
          <Marker
            key={`${ponto.instituicao}-${ponto.reservatorio}-${index}`} // key única
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
              <strong>{ponto.reservatorio ?? ponto.rotulo ?? `ID ${ponto.id}`}</strong>
              <br />
              {ponto.instituicao}
            </Tooltip>
          </Marker>
        ))}
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