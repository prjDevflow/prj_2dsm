import React from "react";
import Map from "./Map"; // ajuste se o caminho for diferente
import type { PontoColeta } from "../types/ponto";

type Props = {
  onMarkerClick?: (p: PontoColeta) => void;
};

const SimaMap: React.FC<Props> = ({ onMarkerClick }) => {
  return <Map onMarkerClick={onMarkerClick} type={"sima"} />;
};

export default SimaMap;
