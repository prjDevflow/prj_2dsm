export class Tc {
  public idtc: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public profundidade?: string;
  public tc?: number;

  constructor(props: Tc) {
    Object.assign(this, props);
  }
}
