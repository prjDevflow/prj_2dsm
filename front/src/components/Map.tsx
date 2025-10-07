import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useColetas } from "../hooks/useColetas"; // seu hook

// tipo genérico de ponto (adapte conforme seu backend)
export type PontoColeta = {
  id: number | string;
  latitude: number;
  longitude: number;
  rotulo?: string;
  name?: string;
  type?: string;
};

type Props = {
  onMarkerClick?: (p: PontoColeta) => void;
};

export default function Map({ onMarkerClick }: Props) {
  const position: LatLngExpression = [-4.4067, -64.6002];
  const [type] = useState<"sima" | "balcar" | "furnas">("sima");

  const { data, isLoading, isError } = useColetas(type);

  if (isLoading) return <div>Carregando mapa...</div>;
  if (isError) return <div>Erro ao carregar coordenadas.</div>;

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

        {data?.map(
          (ponto: { id: number | string; latitude: number; longitude: number; rotulo?: string }) => (
            <Marker
              key={String(ponto.id)}
              position={[ponto.latitude, ponto.longitude] as LatLngExpression}
              // react-leaflet v3/v4: use eventHandlers para clicks
              eventHandlers={{
                click: () => {
                  onMarkerClick?.({
                    id: ponto.id,
                    latitude: ponto.latitude,
                    longitude: ponto.longitude,
                    rotulo: ponto.rotulo,
                  });
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
    </div>
  );
}
