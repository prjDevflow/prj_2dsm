// src/components/Map.tsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
// import api from "../services/api"; //  Para buscar dados reais da API futuramente
// import L from "leaflet";           //  Necessário para ícones customizados

// Tipagem dos pontos de coleta que podem vir da API
interface Coletas {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
}

// Props para o componente Map
interface MapProps {
  onMarkerClick?: (ponto: Coletas) => void;
}

export default function Map({ onMarkerClick }: MapProps) {
  // Posição inicial do mapa (centro do Amazonas)
  const position: LatLngExpression = [-4.4067, -64.6002];

  // 🔹 Mock (dados fictícios para teste do mapa)
  const [coletas] = useState<Coletas[]>([
    {
      id: 9991,
      name: "Ponto Fake 1",
      latitude: -3.1,
      longitude: -60.0,
      type: "sima",
    },
    {
      id: 9992,
      name: "Ponto Fake 2",
      latitude: -5.0,
      longitude: -62.0,
      type: "campanhas",
    },
    {
      id: 9993,
      name: "Ponto Fake 3",
      latitude: -4.5,
      longitude: -66.0,
      type: "sima",
    },
  ]);

  const handleMarkerClick = (ponto: Coletas) => {
    if (onMarkerClick) {
      onMarkerClick(ponto);
    }
  };

  // 🔹 Exemplo para buscar os pontos de uma API
  /*
  useEffect(() => {
    const fetchColetas = async () => {
      try {
        const response = await api.get<Coletas[]>("/coletas");
        setColetas(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar coletas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColetas();
  }, []);
  */

  // 🔹 Exemplo de ícones customizados
  /*
  const simaIcon = L.icon({
    iconUrl: "/icons/drop-blue.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const campanhasIcon = L.icon({
    iconUrl: "/icons/drop-green.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const getIcon = (type?: string) => {
    if (type === "sima") return simaIcon;
    if (type === "campanhas") return campanhasIcon;
    return simaIcon; // padrão
  };
  */

  return (
    <MapContainer
      center={position}
      zoom={6}
      className="map-container"
      scrollWheelZoom={true}
      minZoom={5}
      maxZoom={14}
    >
      {/* Camada base do mapa (fornecida pela Esri) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="© Esri"
      />

      {/* Marcadores dinâmicos */}
      {coletas.map((ponto) => (
        <Marker
          key={ponto.id}
          position={[ponto.latitude, ponto.longitude]}
          eventHandlers={{
            click: () => handleMarkerClick(ponto),
          }}
          // icon={getIcon(ponto.type)} // 🔹 Ative quando quiser usar ícones customizados
        >
          {/* 🔹 Tooltip que aparece apenas no hover do marker */}
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <strong>{ponto.name}</strong> <br />
            ID: {ponto.id} <br />
            {ponto.type && <>Tipo: {ponto.type}</>}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
