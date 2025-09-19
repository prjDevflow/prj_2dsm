// src/components/BarraBrasil.tsx
import { useEffect } from "react";
import styled from "styled-components";

const BarraWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000; /* maior que sidebar e menubar */
`;

const BarraBrasil = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://barra.brasil.gov.br/barra.js";
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BarraWrapper>
      <div id="barra-brasil"></div>
    </BarraWrapper>
  );
};

export default BarraBrasil;
