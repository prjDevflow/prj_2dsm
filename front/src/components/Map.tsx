import { useState } from "react";
import { useColetas } from "../hooks/useColetas"; // Importando o hook de coletas
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

export default function Map() {
  const position: LatLngExpression = [-4.4067, -64.6002];

  // Estado para controlar o tipo de coordenada (sima, balcar ou furnas)
  const [type, setType] = useState<"sima" | "balcar" | "furnas">("sima");

  // Usando o hook para buscar as coordenadas com o tipo selecionado
  const { data, isLoading, isError } = useColetas(type); // Passa o tipo para o hook

  // Exibindo mensagens de carregamento ou erro
  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os dados.</div>;

  return (
    <div>
      {/* Botões para mudar o tipo */}
      <button onClick={() => setType("sima")}>SIMA</button>
      <button onClick={() => setType("balcar")}>BALCAR</button>
      <button onClick={() => setType("furnas")}>FURNAS</button>

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

        {/* Marcadores dinâmicos */}
        {data?.map(
          (ponto: { id: string; latitude: number; longitude: number; rotulo?: string }) => (
            <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                <strong>{ponto.rotulo}</strong> <br />
                ID: {ponto.id}
              </Tooltip>
            </Marker>
          ),
        )}
      </MapContainer>
    </div>
  );
}
