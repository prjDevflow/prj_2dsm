import React from "react";
import Map from "./Map"; // ajuste se o caminho for diferente
import type { PontoColeta } from "../types/ponto";

type Props = {
  onMarkerClick?: (p: PontoColeta) => void;
};

const SimaMap: React.FC<Props> = ({ onMarkerClick }) => {
  return (
    <div className="h-[85vh] rounded-md overflow-hidden shadow-sm">
      {/* o Map original deve aceitar onMarkerClick (conforme seu código atual) */}
      <Map onMarkerClick={onMarkerClick} />
    </div>
  );
};

export default SimaMap;
