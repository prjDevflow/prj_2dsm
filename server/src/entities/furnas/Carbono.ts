export class Carbono {
  public idcarbono: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida: Date | null;
  public horamedida: string | null;
  public toc: number | null;
  public doc: number | null;
  public poc: number | null;

  constructor(props: Carbono) {
    Object.assign(this, props);
  }
}
