export class Sitio {

  idsitio: number;
  nome_sitio: string;
  lat: number;
  lng: number;
  descricao: string | null;
  nome_reservatorio: string;
  nome_instituicao: string;


  constructor(props: Sitio) {
    Object.assign(this, props);
  }
}
