import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
// import api from "../services/api"; // ⬅️ desativado por enquanto
// import L from "leaflet"; // ⬅️ precisa quando for usar ícones customizados

interface Coletas {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
}

export default function Map() {
  const position: [number, number] = [-4.4067, -64.6002];

  // 🔹 Usaria quando a API estiver ligada
  // const [coletas, setColetas] = useState<Coletas[]>([]);
  // const [loading, setLoading] = useState(true);

  // 🔹 Apenas pontos fictícios para teste
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

  // 🔹 Quando for usar a API, basta descomentar
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

  // 🔹 Só funciona se o loading existir (API ativa)
  // if (loading) {
  //   return <p>Carregando mapa...</p>;
  // }

  // 🔹 Ícones customizados (descomente para usar)
  /*
  const simaIcon = L.icon({
    iconUrl: "/icons/drop-blue.png", // coloque esse arquivo na pasta public/icons/
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const campanhasIcon = L.icon({
    iconUrl: "/icons/drop-green.png", // coloque esse arquivo na pasta public/icons/
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const getIcon = (type?: string) => {
    if (type === "sima") return simaIcon;
    if (type === "campanhas") return campanhasIcon;
    return simaIcon; // default
  };
  */

  return (
    <MapContainer
      center={position}
      zoom={6}
      className="map-container"
      scrollWheelZoom={true}
      minZoom={6}
      maxZoom={13}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="© Esri"
      />

      {coletas.map((ponto) => (
        <Marker
          key={ponto.id}
          position={[ponto.latitude, ponto.longitude]}
          // icon={getIcon(ponto.type)} // ⬅️ descomente quando quiser testar os ícones
        >
          <Popup>
            <strong>{ponto.name}</strong> <br />
            ID: {ponto.id} <br />
            {ponto.type && <>Tipo: {ponto.type}</>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
