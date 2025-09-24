import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import api from "../services/api"; // ⬅️ importando instância

interface Coletas {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  type?: string;
}

export default function Map() {
  const position: [number, number] = [-4.4067, -64.6002];
  const [coletas, setColetas] = useState<Coletas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColetas = async () => {
      try {
        const response = await api.get<Coletas[]>("/coletas");
        setColetas(response.data);
        console.log (response.data.data)
      } catch (error) {
        console.error("❌ Erro ao buscar coletas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColetas();
  }, []);

  if (loading) {
    return <p>Carregando mapa...</p>;
  }

  return (
    <MapContainer center={position} zoom={6} scrollWheelZoom={true} className="map-container">
      <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" attribution="© Google" />

      {coletas.map((ponto) => (
        <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]}>
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
