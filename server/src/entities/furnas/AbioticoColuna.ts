export class AbioticoColuna {
  public idabioticocoluna: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida: Date | null;
  public horamedida: string | null; // TIME → string
  public profundidade: number | null;
  public dic: number | null;
  public nt: number | null;
  public pt: number | null;
  public delta13c: number | null;
  public delta15n: number | null;

  constructor(props: AbioticoColuna) {
    Object.assign(this, props);
  }
}
