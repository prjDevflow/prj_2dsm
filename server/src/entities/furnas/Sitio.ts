export class Sitio {
  public idsitio: number;
  public idreservatorio: number;
  public nome: string | null;
  public lat: number | null;
  public lng: number | null;
  public descricao: string | null;

  constructor(props: Sitio) {
    Object.assign(this, props);
  }
}
