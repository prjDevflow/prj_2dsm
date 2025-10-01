export class Pfq {
  public idpfq: number;
  public idcampanha: number;
  public idsitio: number;
  public datamedida?: Date;
  public horamedida?: string;
  public profundidade?: number;
  public batimetria?: number;
  public tempar?: number;
  public tempagua?: number;
  public _do?: number;
  public ph?: number;
  public redox?: number;
  public vento?: string;

  constructor(props: Pfq) {
    Object.assign(this, props);
  }
}
