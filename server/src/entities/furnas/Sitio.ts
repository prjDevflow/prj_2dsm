export class Sitio {
  idsitio: number;
  nome_sitio: string;
  lat: number;
  lng: number;
  descricao: string | null;
  nome_reservatorio: string;
  nome_instituicao: string;
  limit?: number;   // Novo campo opcional
  offset?: number;

  constructor(props: Sitio) {
    Object.assign(this, props);
  }
}
